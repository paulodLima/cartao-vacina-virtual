import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';
import {Pessoa} from '../shared/pessoa';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-campanha',
  templateUrl: './campanha.component.html',
  styleUrls: ['./campanha.component.css']
})
export class CampanhaComponent implements OnInit {

  public formEmail: FormGroup;
  public recipients = '';
  public subject = '';
  public composeEmail = '';
  public annex = '';
  public pessoas: Pessoa;
  public email: Array<string> = new Array<string>();
  public sucesso = false;
  public erro = false;
  public fileName: '';
  public formData: FormData = new FormData();

  constructor(private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.formEmail = this.formBuilder.group({
      recipients: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      composeEmail: ['', [Validators.required]],
      annex: ['', [Validators.required]]
    });
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {

      console.log(pessoas, 'dsadsadsa');

      pessoas.forEach(pessoa => {
        this.email.push(pessoa.email);
      });

    }, erro => {
      console.log('Erro ao listar pessoas', erro);
    });
  }

  inputFile(event) {

    if (event.target.files && event.target.files[0]) {

      this.formEmail.patchValue({
        annex: 'foo',
      });

      const file = event.target.files[0];

      console.log(file, 'dsadsa');
      this.formData.append('file', file);
    }
  }

  envioEmail() {
    this.formEmail.patchValue({
      recipients: this.email,
    });

    if (this.formEmail.valid) {

      this.formData.append('composeEmail', this.formEmail.get('composeEmail').value);
      this.formData.append('subject', this.formEmail.get('subject').value);
      this.email.forEach(email => {
        this.formData.append('recipients', email);
      });

      this.pessoasService.enviarEmail(this.formData).subscribe(
        () => {
          this.formEmail.reset();
          this.sucesso = true;
          setTimeout(() => {
            this.sucesso = false;
          }, 6000);

        }, erro => {

          this.erro = true;

          setTimeout(() => {
            this.erro = false;
          }, 3000);
          console.log('erro ao enviar email', erro);
        });
    }
  }
}
