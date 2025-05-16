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
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {CarByIdResponse} from '../../models/car-by-id.interface';
import {
    CurrencyList,
    ISO_CURRENCIES_CODE,
} from '../../models/currency.interface';
import {ModelByBrandResponse} from '../../models/model-by-brand.interface';
import {BrandsService} from '../../services/brands.service';
import {CarsService} from '../../services/cars.service';

@Component({
    selector: 'app-car-new',
    imports: [ReactiveFormsModule],
    templateUrl: './car-new.component.html',
    styleUrl: './car-new.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarNewComponent implements OnInit {
    readonly fb = inject(FormBuilder);
    readonly carsService = inject(CarsService);
    readonly brandsService = inject(BrandsService);

    carForm: FormGroup = this.fb.group({});
    brandsSignal = signal<string[]>([]);
    modelsSignal = signal<ModelByBrandResponse[]>([]);
    carSignal = signal<CarByIdResponse[]>([]);
    currencySignal = signal<CurrencyList[]>([]);
    filteredCurrencies = signal<CurrencyList[]>([]);
    currentYear = new Date().getFullYear();
    clicks: number[] = [];

    ngOnInit(): void {
        // Inicializar formulario
        this.carForm = this.fb.group({
            brand: ['', Validators.required],
            model: [{value: '', disabled: true}, Validators.required],
            carDetails: this.fb.array([
                this.fb.group({
                    availability: [false],
                    currency: [
                        '',
                        [Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
                    ],
                    registrationDate: ['', Validators.required],
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
                            Validators.pattern(/^[A-Z0-9]{1,7}$/),
                        ],
                    ],
                    price: ['', [Validators.required, Validators.min(0)]],
                }),
            ]),
        });

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

        // Escuchar cambios en currency para filtrar sugerencias
        this.getCarDetailControl('currency').valueChanges.subscribe(value => {
            if (value) {
                const filtered = this.currencySignal().filter(currency =>
                    currency.code.toLowerCase().includes(value.toLowerCase()),
                );
                this.filteredCurrencies.set(filtered);
            } else {
                this.filteredCurrencies.set(this.currencySignal());
            }
        });
    }

    // Getter para acceder al FormArray de CarDetails
    get carDetails(): FormArray {
        return this.carForm.get('carDetails') as FormArray;
    } // a este hay que hacer push

    // Función auxiliar para obtener controles de carDetails como FormControl
    getCarDetailControl(field: string): FormControl {
        const control = this.carDetails.at(0).get(field);
        if (!control) {
            throw new Error(`Control ${field} not found in carDetails`);
        }
        return control as FormControl;
    }

    // Cargar modelos
    loadModels(): void {
        const brand = this.carForm.get('brand')?.value;
        if (brand) {
            this.brandsService.getModelByBrand(brand).subscribe(models => {
                this.modelsSignal.set(models);
            });
        }
    }

    createNewCar(): void {
        this.clicks.push(this.clicks.length + 1); // me tengo que crear un formgroup que corresponda con el cardetails y hacerle push al formarray y en el bucle haces el for sobre los controles del fromarray
    }

    // Seleccionar una moneda del autocompletado
    selectCurrency(currency: CurrencyList): void {
        this.getCarDetailControl('currency').setValue(currency.code);
        this.filteredCurrencies.set([]); // Ocultar sugerencias tras seleccionar
    }

    onSubmit(): void {
        if (this.carForm.valid) {
            const formValue = this.carForm.getRawValue(); // Incluir controles deshabilitados
            const newCar: CarByIdResponse = {
                brand: formValue.brand,
                model: formValue.model,
                id: uuidv4(),
                total: this.carSignal().length + 1,
                carDetails: formValue.carDetails,
            };
            this.carsService.createCar(newCar).subscribe({
                next: createdCar => {
                    this.carSignal.update(cars => [...cars, createdCar]);
                    this.carForm.reset();
                    this.modelsSignal.set([]);
                    this.carForm.get('model')?.disable();
                    this.filteredCurrencies.set(this.currencySignal()); // Restablecer sugerencias
                },
                error: err => console.error('Error al crear coche:', err),
            });
        }
    }
}
