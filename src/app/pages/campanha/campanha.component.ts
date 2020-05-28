import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';
import {Pessoa} from '../shared/pessoa';

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
  public email = [];
  public sucesso = false;
  public erro = false;
  public fileName: '';

    constructor(private formBuilder: FormBuilder,
                private pessoasService: PessoasService) { }

  ngOnInit(): void {
      this.formEmail = this.formBuilder.group({
          recipients:   ['', [Validators.required]],
          subject:      ['', [Validators.required]],
          composeEmail: ['', [Validators.required]],
          annex:        ['', [Validators.required]]
      });
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {
      for (let i = 0; i <= pessoas.length; i++) {
        this.pessoas = pessoas[i];
        this.email.push(this.pessoas.email);
      }

    }, erro => {
      console.log('Erro ao listar pessoas', erro);
    });
  }

  inputFile(event) {

      if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.fileName = event.target.value;
      this.removeNome(this.fileName);

      const formData = new FormData();
      formData.append('file', file);

      this.pessoasService.salvarAnexo(formData).subscribe(
        () => {
          console.log('passando aqui e salvando');
        }, erro => console.log('erro ao anexar', erro)
      );
    }
  }

  envioEmail() {
      this.formEmail. patchValue({
        recipients: this.email,
        annex: this.fileName
    });

    if (this.formEmail.valid) {

      console.log('enviando email', this.formEmail);

      this.pessoasService.enviarEmail(this.formEmail.value).subscribe(
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
          }, 6000);
          console.log('erro ao enviar email', erro);
        });
    }
  }

  removeNome(nome) {
      const res = nome.split('C:\\fakepath\\');
      this.fileName =  res[1];
  }
}
