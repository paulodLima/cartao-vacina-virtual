import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../pages/services/login.service';
import {Router} from '@angular/router';
import {PessoasService} from '../pages/services/pessoas.service';
import {Pessoa} from '../pages/shared/pessoa';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin = false;

  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService,
              private pessoa: PessoasService
              ) { }

  autenticacao(usuario: string, senha: string, person: Pessoa[]) {

    for (let i = 0; i <= person.length; i++) {
          if (usuario === person[i].documentNumber && senha === person[i].documentNumber) {
        localStorage.setItem('usuario', JSON.stringify(person[i]));

          this.admin = true;
          this.loginService.autenticarUsario();
          this.router.navigateByUrl('/dashboard');

        }
    }

  }
}
