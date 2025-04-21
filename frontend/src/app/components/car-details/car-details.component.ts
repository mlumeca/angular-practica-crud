import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CAR_BRANDS} from '../../models/car-brands.interface';
import {CarByIdResponse} from '../../models/car-by-id.interface';
import {CarConditionPipe} from '../../pipes/car-condition.pipe';
import {CarsService} from '../../services/cars.service';

@Component({
    selector: 'app-car-details',
    imports: [CarConditionPipe, CurrencyPipe, DecimalPipe],
    templateUrl: './car-details.component.html',
    styleUrl: './car-details.component.css',
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
            this.carsService.getCarById(carId).subscribe(resp => {
                this.car = resp;
                const brandKey = this.car.brand.toLowerCase();
                this.backgroundImage = CAR_BRANDS[brandKey]?.background;
            });
        }
    }
}
