import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_AUTH} from '../../app.api';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {
  public captcha: string;
  public mensagem: string;
  public erro = false;
  public sucesso: boolean;
  public formEmail: FormGroup;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      captcha: ['', [Validators.required]],
    });
  }

  public resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  recuperarEmail(email: string) {

    if (this.captcha !== undefined && this.formEmail.valid) {
        let headers = new HttpHeaders();
        headers = headers.append('email',  email);

        this.http.put(`${URL_AUTH}/v1/api/auth/user/password-reset`, null, {headers, responseType: 'text'}).subscribe(resposta => {

          this.mensagem = 'Link de recuperação de senha enviado para seu e-mail';
          this.sucesso = true;

          setTimeout(() => {

            this.sucesso = false;

          }, 6000);
          this.router.navigateByUrl('/minhas-vacinas');

        }, error => { console.log('erro', error);
         if (error.status === 404) {

          this.mensagem = `${email} não cadastrado`;
         }
        this.erro = true;

        setTimeout(() => {

          this.erro = false;

        }, 3000); });
    }
  }
}
