import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    @Input() title: string = 'CRUD Table';
    @Input() breadcrumbs: Breadcrumb[] = [
        {label: 'Home', url: '/'},
        {label: 'CRUD Table'},
    ];
}
