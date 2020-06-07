import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PessoasComponent } from '../../pages/pessoas/pessoas.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import {RegisterVaccineComponent} from '../../pages/register-vaccine/register-vaccine.component';
import {CadastrarPessoaComponent} from '../../pages/cadastrar-pessoa/cadastrar-pessoa.component';
import {AuthGuard} from '../../pages/guards/auth-guard';
import {CampanhaComponent} from '../../pages/campanha/campanha.component';
import {CadastrarVacinaComponent} from '../../pages/cadastrar-vacina/cadastrar-vacina.component';
import {AdicionarVacinaComponent} from '../../pages/adicionar-vacina/adicionar-vacina.component';
import {MinhasVacinasComponent} from '../../pages/minhas-vacinas/minhas-vacinas.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'campanha',      component: CampanhaComponent, canActivate: [AuthGuard] },
    {path: 'register-vaccine', component: RegisterVaccineComponent, canActivate: [AuthGuard]},
    { path: 'pessoas',          component: PessoasComponent, canActivate: [AuthGuard] },
    {path: 'cadastrar-pessoa', component: CadastrarPessoaComponent, canActivate: [AuthGuard]},
    {path: 'cadastrar-vacina', component: CadastrarVacinaComponent, canActivate: [AuthGuard]},
    {path: 'editar-pessoa/:id', component: CadastrarPessoaComponent, canActivate: [AuthGuard]},
    {path: 'adicionar-vacina', component: AdicionarVacinaComponent, canActivate: [AuthGuard]},
    {path: 'minhas-vacinas', component: MinhasVacinasComponent, canActivate: [AuthGuard]}
];
