import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {LoginComponent} from '../login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  login: LoginComponent;
  constructor(private loginService: LoginService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.loginService.loginAutenticado) {
      return true;
    }
    this.router.navigate(['']);
    return false;

  }
}
