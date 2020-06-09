import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from '../pages/services/login.service';
import {Router} from '@angular/router';
import {PessoasService} from '../pages/services/pessoas.service';
import {Pessoa} from '../pages/shared/pessoa';
import {CLIENTSECURITY, USER, PASSWORD, CLIENTID, URL_AUTH, URL_REFRESH} from '../app.api';
import {Observable, Subscription} from 'rxjs';
import {RequestOptions} from '@angular/http';
import {any} from 'codelyzer/util/function';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin = false;
  private accessToken;
  private token = {username: USER, password: PASSWORD, clientId: CLIENTID, clientSecret: CLIENTSECURITY};
  private refreshToken = {clientId: CLIENTID, clientSecret: CLIENTSECURITY, refreshToken: null};

  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService,
              private pessoa: PessoasService
              ) { }

  autenticacao(usuario: string, senha: string, person: Pessoa[]) {


          if (usuario === 'admin' && senha === 'admin123') {
          this.getRoles();
          localStorage.setItem('usuario', JSON.stringify(''));
          this.admin = true;
          this.loginService.autenticarUsario();
          this.router.navigateByUrl('/dashboard');

    }

  }

  gerarToken() {
    return this.http.post(`${URL_AUTH}/v1/api/auth/token`, this.token);
  }


  geraAcToken() {
    console.log(this.refreshToken);
    return this.http.post(`${URL_AUTH}/v1/api/auth/refresh`, this.refreshToken).subscribe(refresh => {
        console.log('novo token', refresh);
    }, error => console.log('erro ao gerar novo token', error));
  }

  public getRoles(): Subscription {

    return this.gerarToken().subscribe(token => {

      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + token.access_token);

      this.http.get(`${URL_AUTH}/v1/api/auth/role`, {headers, responseType: 'text'} ).subscribe(resposta => {
        console.log(resposta);
      }, error => console.log('erro', error));

    }, error => console.log('erro ao gerar token', error));

  }
}
