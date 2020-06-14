import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {Pessoa} from '../shared/pessoa';
import {PessoasService} from '../services/pessoas.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup;
  public person: Pessoa[];
  public user: UserProfileComponent;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private pessoa: PessoasService) {
  }

  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      usuario: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.pattern(/^-?(0|[a-z0-9]{8}\d*)?$/)]]
    });
    this.listarPessoas();
  }

  ngOnDestroy() {
  }

  listarPessoas() {
    this.pessoa.listarPessoas().subscribe(pessoas => {
      this.person = pessoas;
    }, erro => {
      console.log('Erro ao listar pessoas', erro);
    });
  }


  login() {
    if (this.formLogin.valid) {
      this.auth.autenticacao(this.formLogin.get('usuario').value, this.formLogin.get('senha').value, this.person);
    } else {
      alert('Usuário ou senha esta em formato incorreto');
    }
  }

}
