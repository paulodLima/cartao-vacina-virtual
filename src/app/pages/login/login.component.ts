import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.formLogin = this.formBuilder.group({
      usuario: [null, [Validators.required, Validators.pattern(/^-?(0|[a-z]{2,15}\d*)?$/)]],
      senha: [null, [Validators.required, Validators.pattern(/^-?(0|[a-z0-9]{8,15}\d*)?$/)]]
    });

  }

  ngOnDestroy() {
  }

  login() {
    console.log(this.formLogin);

    if (this.formLogin.valid &&
      this.formLogin.get('usuario').value === 'admin' &&
      this.formLogin.get('senha').value === 'admin123') {

      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Usuário ou senha incorretas');
    }
  }
}
