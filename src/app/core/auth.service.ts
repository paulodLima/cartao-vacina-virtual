import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from '../pages/services/login.service';
import {Router} from '@angular/router';
import {PessoasService} from '../pages/services/pessoas.service';
import {Pessoa} from '../pages/shared/pessoa';
import {CLIENTID, CLIENTSECURITY, PASSWORD, URL_AUTH, USER} from '../app.api';
import {Subscription} from 'rxjs';
import {Token} from './model/token';
import {DecodedToken} from './model/decoded-token';
import {Role} from './model/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ACCESS_TOKEN = 'access_token';
  private CURRENT_USER = 'currentUser';
  public admin = false;
  public roles: Array<Role> = new Array<Role>();
  token = {username: USER, password: PASSWORD, clientId: CLIENTID, clientSecret: CLIENTSECURITY};
  private refreshToken = {clientId: CLIENTID, clientSecret: CLIENTSECURITY, refreshToken: null};

  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService,
              private pessoa: PessoasService
  ) {
  }

  autenticacao(usuario: string, senha: string, person: Pessoa[]) {
    this.login(usuario, senha).subscribe((token: Token) => {
      localStorage.setItem(usuario, token.refresh_token);
      localStorage.setItem(this.CURRENT_USER, usuario);
      this.getRoles();
      this.admin = this.getDecodedToken(token, this.ACCESS_TOKEN).realm_access.roles.includes('admin');
      this.loginService.autenticarUsario();
      if (this.admin) {
        this.router.navigateByUrl('/lista-vacinas');
      } else {
        this.router.navigateByUrl('/minhas-vacinas');
      }
    }, error => {
      alert('erro ao efetuar login');
    });
  }

  private login(user: string, password: string) {
    this.token.username = user;
    this.token.password = password;
    return this.http.post(`${URL_AUTH}/v1/api/auth/token`, this.token);
  }


  private geraAcToken() {
    console.log(this.refreshToken);
    return this.http.post(`${URL_AUTH}/v1/api/auth/refresh`, this.refreshToken).subscribe(refresh => {
      console.log('novo token', refresh);
    }, error => console.log('erro ao gerar novo token', error));
  }

  public getRoles(): Subscription {

    return this.login(this.token.username, this.token.password).subscribe((token: Token) => {

      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + token.access_token);

      this.http.get(`${URL_AUTH}/v1/api/auth/role`, {headers})
        .subscribe((role: Array<Role>) => {
          this.roles = role;
          this.roles.forEach(s => {
            if (s.name === 'patient') {
              s.namePt = 'usuário';
            } else if (s.name === 'admin') {
              s.namePt = 'administrador';
            } else if (s.name === 'gestor') {
              s.namePt = 'gerente';
            }
          });
        }, error => console.log('erro', error));

    }, error => console.log('erro ao gerar token', error));

  }

  public getDecodedToken(token: Token, type: string): DecodedToken {

    let body: string;
    if (type === this.ACCESS_TOKEN) {
      body = token.access_token.split('.')[1];
    } else {
      body = token.refresh_token.split('.')[1];
    }
    const decodedToken: DecodedToken = JSON.parse(atob(body));

    decodedToken.realm_access.roles = decodedToken.realm_access.roles.filter((value) => value !== 'offline_access' && value !== 'uma_authorization');

    return decodedToken;
  }

  public tokenIsvalid(decodedToken: DecodedToken): boolean {

    const expireDate: Date = new Date(decodedToken.exp * 1000);

    return expireDate <= new Date();
  }

  public logout() {
    localStorage.removeItem(this.CURRENT_USER);
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  public isLogged(): boolean {
    const token: Token = new Token();
    token.refresh_token = localStorage.getItem(localStorage.getItem(this.CURRENT_USER));
    return this.tokenIsvalid(this.getDecodedToken(token, 'refresh_token'));
  }

}
