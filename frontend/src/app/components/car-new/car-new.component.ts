import {JsonPipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {Router} from '@angular/router';
import {CarByIdResponse} from '../../models/car-by-id.interface';
import {DetailsFormArray} from '../../models/car-details-array.interface';
import {
    CurrencyList,
    ISO_CURRENCIES_CODE,
} from '../../models/currency.interface';
import {ModelByBrandResponse} from '../../models/model-by-brand.interface';
import {BrandsService} from '../../services/brands.service';
import {CarsService} from '../../services/cars.service';
import {formatDate} from '../../util/formatDates';
import {manufactureYearValidator} from '../../util/manufactureYearValidator';

@Component({
    selector: 'app-car-new',
    imports: [ReactiveFormsModule, JsonPipe], // JsonPipe
    templateUrl: './car-new.component.html',
    styleUrl: './car-new.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarNewComponent implements OnInit {
    readonly formBuilder = inject(FormBuilder);
    readonly carsService = inject(CarsService);
    readonly brandsService = inject(BrandsService);
    readonly router = inject(Router);
    brandsSignal = signal<string[]>([]);
    modelsSignal = signal<ModelByBrandResponse[]>([]);
    carSignal = signal<CarByIdResponse[]>([]);
    currencySignal = signal<CurrencyList[]>([]);
    filteredCurrencies = signal<CurrencyList[]>([]);
    currentYear = new Date().getFullYear();
    clicks: number[] = [];
    isShown = false;

    // Se inicializa del tirón
    carForm = this.formBuilder.group({
        brand: ['', Validators.required],
        model: [{value: '', disabled: true}, Validators.required],
        carDetails: this.formBuilder.array<FormGroup<DetailsFormArray>>([]),
    });

    ngOnInit() {
        // Cargar marcas
        this.brandsService.getBrands().subscribe(resp => {
            this.brandsSignal.set(resp);
        });

        // Cargar monedas
        const currencies = Object.values(ISO_CURRENCIES_CODE);
        this.currencySignal.set(currencies);
        this.filteredCurrencies.set(currencies);

        // Escuchar cambios en brand
        this.carForm.get('brand')?.valueChanges.subscribe(brand => {
            const modelControl = this.carForm.get('model');
            if (brand) {
                modelControl?.enable();
                this.loadModels();
            } else {
                this.modelsSignal.set([]);
                modelControl?.disable();
                modelControl?.reset();
            }
        });
    }

    // Getters
    get carDetailsForm() {
        return this.carForm.controls.carDetails;
    }

    get brandControl() {
        return this.carForm.controls.brand;
    }

    get modelControl() {
        return this.carForm.controls.model;
    }

    get carDetails() {
        return this.carForm.get('carDetails') as FormArray;
    }

    // Cargar modelos
    loadModels() {
        const brand = this.carForm.get('brand')?.value;
        if (brand) {
            this.brandsService.getModelByBrand(brand).subscribe(models => {
                this.modelsSignal.set(models);
            });
        }
    }

    // Crear menu Details
    createFormDetails() {
        return this.formBuilder.group(
            {
                availability: [false],
                currency: ['', [Validators.required]],
                registrationDate: ['', [Validators.required]],
                manufactureYear: [
                    '',
                    [
                        Validators.required,
                        Validators.min(1900),
                        Validators.max(this.currentYear),
                    ],
                ],
                mileage: ['', [Validators.required, Validators.min(0)]],
                licensePlate: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(/^[0-9]{4}[ -]?[A-HJ-NP-Z]{3}$/),
                    ],
                ], // Formato español
                price: ['', [Validators.required, Validators.min(1)]],
            },
            // validator global
            {
                validators: [manufactureYearValidator],
            },
        );
    }

    createNewCar() {
        const form = this.createFormDetails();
        this.carDetails.push(form);
    }

    removeCarDetail(index: number) {
        this.carDetails.removeAt(index);
    }

    onSubmit() {
        if (this.carForm.valid) {
            // Capture form values before resetting
            const formValue = this.carForm.getRawValue();

            // Transform carDetails
            const transformedDetails = this.carDetails.controls.map(group => {
                const carGroup = group as FormGroup<DetailsFormArray>;
                const originalDate = carGroup.get('registrationDate')?.value;

                return {
                    registrationDate: originalDate
                        ? formatDate(originalDate)
                        : '',
                    manufactureYear:
                        carGroup.get('manufactureYear')?.value ?? 1900,
                    mileage: carGroup.get('mileage')?.value ?? 0,
                    licensePlate: carGroup.get('licensePlate')?.value ?? '',
                    currency: carGroup.get('currency')?.value ?? '',
                    price: carGroup.get('price')?.value ?? 0,
                    availability: carGroup.get('availability')?.value ?? false,
                };
            });

            // Create the new car object
            const newCar: Partial<CarByIdResponse> = {
                brand: formValue.brand || '',
                model: formValue.model || '',
                carDetails: transformedDetails,
            };

            // Debugging: Log the object to be sent
            console.log('Objeto enviado al backend:', newCar);

            // Send to backend
            this.carsService.createCar(newCar as CarByIdResponse).subscribe({
                next: createdCar => {
                    console.log('Respuesta del backend:', createdCar);

                    // Update signal with new car
                    this.carSignal.update(cars => [...cars, createdCar]);

                    // Reset form after successful submission
                    this.carForm.reset();
                },
                error: err => console.error('Error al crear coche:', err),
            });
            this.router.navigateByUrl('/home');
        }
    }
}
