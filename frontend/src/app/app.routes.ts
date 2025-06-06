import {Routes} from '@angular/router';
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {CarEditComponent} from './components/car-edit/car-edit.component';
import {CarNewComponent} from './components/car-new/car-new.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {
        path: 'cars/:id',
        component: CarDetailsComponent,
    },

    // {path: 'delete', component: },
    {path: 'new', component: CarNewComponent},
    {path: 'cars/edit/:id', component: CarEditComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
];
