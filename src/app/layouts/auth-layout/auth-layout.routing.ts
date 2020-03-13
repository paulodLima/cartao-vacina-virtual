import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegistrarComponent } from '../../pages/registrar/registrar.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegistrarComponent }
];
