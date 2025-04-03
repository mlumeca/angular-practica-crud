import {Component} from '@angular/core';
import {CrudTableComponent} from '../crud-table/crud-table.component';

@Component({
    selector: 'app-home',
    imports: [CrudTableComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
