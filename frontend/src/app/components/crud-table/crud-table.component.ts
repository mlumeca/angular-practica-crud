import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReusableButtonDirective} from '../../directives/reusable-button.directive';
import {CAR_BRANDS} from '../../models/car-brands.interface';
import {CarListResponse} from '../../models/car-list.interface';
import {BrandsService} from '../../services/brands.service';
import {CarsService} from '../../services/cars.service';
@Component({
    selector: 'app-crud-table',
    standalone: true,
    imports: [RouterModule, ReusableButtonDirective],
    templateUrl: './crud-table.component.html',
    styleUrl: './crud-table.component.css',
})
export class CrudTableComponent implements OnInit {
    cars: CarListResponse[] = [];

    constructor(
        private carsService: CarsService,
        private brandsService: BrandsService,
    ) {}

    openDropdown() {
        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        this.carsService.getCars().subscribe(resp => {
            this.cars = resp;
        });
    }

    // Accede al diccionario de logos
    getLogo(brand: string): string {
        const brandKey = brand.toLowerCase();
        return CAR_BRANDS[brandKey]?.logo;
    }
}
