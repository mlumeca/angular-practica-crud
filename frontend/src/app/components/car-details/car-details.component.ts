import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CAR_BRANDS} from '../../models/car-brands.interface';
import {CarByIdResponse} from '../../models/car-by-id.interface';
import {CarConditionPipe} from '../../pipes/car-condition.pipe';
import {CarsService} from '../../services/cars.service';

@Component({
    selector: 'app-car-details',
    standalone: true,
    imports: [CarConditionPipe, CurrencyPipe, DatePipe, DecimalPipe],
    templateUrl: './car-details.component.html',
    styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
    car!: CarByIdResponse;
    backgroundImage: string = '';

    constructor(
        private route: ActivatedRoute,
        private carsService: CarsService,
    ) {}

    ngOnInit(): void {
        const carId = this.route.snapshot.paramMap.get('id');
        if (carId) {
            this.carsService.getCarById(carId).subscribe({
                next: resp => {
                    this.car = resp;
                    this.backgroundImage =
                        CAR_BRANDS[this.car.brand.toLowerCase()]?.background ??
                        '';
                },
                error: err => {
                    console.error('Error fetching car details:', err);
                    // Optionally handle error (e.g., show a message to the user)
                },
            });
        }
    }
}
