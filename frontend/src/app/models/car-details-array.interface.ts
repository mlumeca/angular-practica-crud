import {FormControl} from '@angular/forms';

export interface DetailsFormArray {
    registrationDate: FormControl<string>;
    manufactureYear: FormControl<number>;
    mileage: FormControl<number>;
    licensePlate: FormControl<string>;
    currency: FormControl<string>;
    price: FormControl<number>;
    availability: FormControl<boolean>;
}
