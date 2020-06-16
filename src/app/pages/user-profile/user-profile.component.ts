import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../shared/pessoa';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';
import {VacinaService} from '../services/vacina.service';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public pessoa: Pessoa;
  public formPerson: FormGroup;
  edit = true;
  public id: number;
  public erro = false;
  public mensagemErro: string;
  public sucesso = false;
  desabilitado = true;
  private pessoaToken: Pessoa[];
  telMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  alturaMask = [/\d/, ',', /\d/, /\d/];
  pesoMask = [/\d/, /\d/, ',', /\d/, /\d/];
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cefMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.formPerson = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-z A-Z]{5,40}$/)]],
      documentNumber: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
      sexType: ['', Validators.required],
      fathersName: ['', [Validators.required, Validators.pattern(/^[a-z A-Z]{5,40}$/)]],
      mothersName: ['', [Validators.required, Validators.pattern(/^[a-z A-Z]{5,40}$/)]],
      address: this.formBuilder.group({
        zipCode: ['', [Validators.required]],
        city: ['', Validators.required],
        street: ['', Validators.required],
        state: ['', Validators.required],
        complement: [''],
        neighborhood: ['', Validators.required]
      }),
      phone: this.formBuilder.group({
        areaCode: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]{0,2}\d*)?$/)]],
        number: ['', [Validators.required]]
      }),
      height: this.formBuilder.group({
        height: ['', [Validators.required]],
      }),
      weight: this.formBuilder.group({
        weight: ['', [Validators.required]]
      })
    });

    this.buscarUsuario();

  }
  buscarUsuario() {
    this.pessoasService.pesquisarPessoasEmail(this.authService.token.username).subscribe(usuario => {
      this.pessoaToken = usuario;
      console.log('pessoa token', this.pessoaToken[0]);
      this.atualizarPerfil(this.pessoaToken[0]);
      this.pessoa = this.pessoaToken[0];
    }, error => console.log('erro ao consultar pessoa', error));
  }
  atualizarPerfil(pessoa) {
    console.log('dentro de atualizar pessoa', pessoa);
    this.formPerson.patchValue({
      fullName: pessoa.fullName,
      documentNumber: pessoa.documentNumber,
      email: pessoa.email,
      birthDate: pessoa.birthDate,
      sexType: pessoa.sexType,
      fathersName: pessoa.fathersName,
      mothersName: pessoa.mothersName,
      address: ({
        city: pessoa.address.city,
        neighborhood: pessoa.address.neighborhood,
        zipCode: pessoa.address.zipCode,
        state: pessoa.address.state,
        street: pessoa.address.street,
        complement: pessoa.address.complement
      }),
      phone: ({
        areaCode: pessoa.phone.areaCode,
        number: pessoa.phone.number
      }),
      height: ({
        height: pessoa.height.height,
      }),
      weight: ({
        weight: pessoa.weight.weight
      })
    });
  }

  editar() {
    this.edit = false;
  }

  editarDados() {
    if (this.formPerson.value) {
      this.formPerson.patchValue({
        weight: ({
          weight:  `${this.formPerson.get('weight.weight').value}`
        }),
        height: ({
          height:  `${this.formPerson.get('height.height').value}`
        })
      });
      console.log('uuid', this.pessoa.uuid);
      this.pessoasService.atualizarPessoa(this.pessoa.uuid, this.formPerson.value).subscribe(pessoa => {

        this.sucesso = true;

        setTimeout(() => {
          this.sucesso = false;
        }, 5000);

        const scrollToTop = window.setInterval(() => {
          const pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 16);
        console.log(pessoa);
      }, erro => {console.log('erro ao atualizar', erro);
      this.mensagemErro = erro.error.messages;
      this.erro = true;

      setTimeout(() => {

        this.erro = false;

      }, 6000);

      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    });
    }
  }
}
