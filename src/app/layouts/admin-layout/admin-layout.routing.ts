import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PessoasComponent } from '../../pages/pessoas/pessoas.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {RegistrarComponent} from '../../pages/registrar/registrar.component';
import {RegisterVaccineComponent} from '../../pages/register-vaccine/register-vaccine.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'pessoas',          component: PessoasComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'register',      component: RegistrarComponent},
    { path: 'register-vaccine', component: RegisterVaccineComponent}
];
