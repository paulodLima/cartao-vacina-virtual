import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import {RecuperarSenhaComponent} from '../../pages/recuperar-senha/recuperar-senha.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    {path: 'recuperar-senha', component: RecuperarSenhaComponent},
];
