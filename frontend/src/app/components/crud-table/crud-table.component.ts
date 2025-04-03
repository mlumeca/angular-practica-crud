import {CdkMenu, CdkMenuItem} from '@angular/cdk/menu';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-crud-table',
    standalone: true,
    imports: [CdkMenu, CdkMenuItem, MatButtonModule],
    templateUrl: './crud-table.component.html',
    styleUrl: './crud-table.component.css',
})
export class CrudTableComponent {}
