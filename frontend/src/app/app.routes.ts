import {Routes} from '@angular/router';
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {CarNewComponent} from './components/car-new/car-new.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {
        path: 'cars/:id',
        component: CarDetailsComponent,
    },
    // {path: 'edit', component: },
    // {path: 'delete', component: },
    {path: 'new', component: CarNewComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
];
