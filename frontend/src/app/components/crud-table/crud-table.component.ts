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

    /* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */

    openDropdown(id: string) {
        const template = `
        <div id="myDropdown" class="dropdown-content">
            <a href="/cars/edit/${id}">Editar</a>
            <a href="/delete">Eliminar</a>
        </div>`;

        const container = document.getElementById('dropdown');

        if (container) {
            container.innerHTML = template;
        } else {
            console.error('No se encontró el contenedor para el dropdown.');
        }
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
