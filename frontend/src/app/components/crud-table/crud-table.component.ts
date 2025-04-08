import {CdkMenu, CdkMenuItem} from '@angular/cdk/menu';
import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CarListResponse} from '../../models/car-list.interface';
import {CarsService} from '../../services/cars.service';

@Component({
    selector: 'app-crud-table',
    standalone: true,
    imports: [CdkMenu, CdkMenuItem, MatButtonModule],
    templateUrl: './crud-table.component.html',
    styleUrl: './crud-table.component.css',
})
export class CrudTableComponent implements OnInit {
    cars: CarListResponse[] = [];

    constructor(private carsService: CarsService) {}

    ngOnInit(): void {
        this.carsService.getCars().subscribe(resp => {
            this.cars = resp;
        });
    }
}
