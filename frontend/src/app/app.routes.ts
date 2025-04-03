import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    // {path: 'edit', component: },
    // {path: 'delete', component: },
    // {path: 'create', component: },
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
];
