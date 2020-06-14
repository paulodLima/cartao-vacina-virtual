import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {

  public loginAutenticado: boolean;

  constructor() {
  }

  autenticarUsario() {
    this.loginAutenticado = true;
  }

  logout() {
    this.loginAutenticado = false;
  }
}
