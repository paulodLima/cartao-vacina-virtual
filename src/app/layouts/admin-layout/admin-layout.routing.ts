import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PessoasComponent } from '../../pages/pessoas/pessoas.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {RegisterVaccineComponent} from '../../pages/register-vaccine/register-vaccine.component';
import {CadastrarPessoaComponent} from '../../pages/cadastrar-pessoa/cadastrar-pessoa.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'pessoas',          component: PessoasComponent },
    { path: 'maps',           component: MapsComponent },
    {path: 'register-vaccine', component: RegisterVaccineComponent},
    {path: 'cadastrar-pessoa', component: CadastrarPessoaComponent}
];
