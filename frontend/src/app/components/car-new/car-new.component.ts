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
import {v4 as uuidv4} from 'uuid';
import {CarByIdResponse} from '../../models/car-by-id.interface';
import {ModelByBrandResponse} from '../../models/model-by-brand.interface';
import {BrandsService} from '../../services/brands.service';
import {CarsService} from '../../services/cars.service';

@Component({
    selector: 'app-car-new',
    imports: [ReactiveFormsModule],
    templateUrl: './car-new.component.html',
    styleUrl: './car-new.component.css',

    // Re-renders the html only when the component detects a reference change in its input
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarNewComponent implements OnInit {
    /*
    Forma antigua (Angular <= 18) es con el constructor
    constructor(
        private fb: FormBuilder,
        private carsService: CarsService,
        private brandsService: BrandsService,
    )
    
    Ahora (Angular 19) los servicios y dependencias se deben inyectar: */
    readonly fb = inject(FormBuilder);
    readonly carsService = inject(CarsService);
    readonly brandsService = inject(BrandsService);

    carForm: FormGroup = this.fb.group([]);
    // Signals are getter functions - calling them reads their value, better rendimiento
    brandsSignal = signal<string[]>([]);
    modelsSignal = signal<ModelByBrandResponse[]>([]);
    carSignal = signal<CarByIdResponse[]>([]);

    currentYear = new Date().getFullYear();
    currentDate = new Date().getDate();
    clicks: number[] = [];

    ngOnInit(): void {
        this.carForm = this.fb.group({
            brands: ['', Validators.required],
            models: [{value: '', disabled: true}, Validators.required],
            carDetails: this.fb.array([
                this.fb.group({
                    availability: [false],
                    currency: [
                        '',
                        [Validators.required, Validators.pattern(/^[A-Z]{3}$/)], //ISO 4217
                    ],
                    registrationDate: [
                        '',
                        [
                            Validators.required,
                            Validators.min(1900),
                            Validators.max(this.currentDate),
                        ],
                    ],
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

        this.brandsService.getBrands().subscribe(resp => {
            this.brandsSignal.set(resp);
        });

        this.carForm.get('brand')?.valueChanges.subscribe(brand => {
            // Control de modelo para escuchar cambios en el campo "brand"
            const modelControl = this.carForm.get('model');

            if (brand) {
                modelControl?.enable();
            } else {
                this.modelsSignal.set([]);
                modelControl?.disable();
                modelControl?.reset();
            }
        });
    }

    // Getter para acceder al FormArray de CarDetails
    get CarDetails(): FormArray {
        return this.carForm.get('carDetails') as FormArray;
    }

    // Cargar modelos al desplegar el select de modelos
    loadModels(): void {
        const brand = this.carForm.get('brand')?.value;
        if (brand) {
            this.brandsService.getModelByBrand(brand).subscribe(models => {
                this.modelsSignal.set(models);
            });
        }
    }

    createNewCar(): void {
        this.clicks.push(this.clicks.length + 1);
    }

    onSubmit(): void {
        if (this.carForm.valid) {
            const formValue = this.carForm.value; // getRawValue() ??
            const newCar: CarByIdResponse = {
                brand: formValue.brand,
                model: formValue.model,
                id: uuidv4(), // generate an UUID
                total: this.carSignal().length + 1,
                carDetails: formValue.carDetails,
            };
            this.carsService.createCar(newCar).subscribe({
                next: createdCar => {
                    this.carSignal.update(cars => [...cars, createdCar]); // Añade el coche a la lista
                    this.carForm.reset(); // Resetea formulario
                    this.modelsSignal.set([]); // Limpia modelos
                    this.carForm.get('model')?.disable(); // Deshabilita modelos tras reset
                },
                error: err => console.error('Error al crear coche:', err),
            });
        }
    }
}
