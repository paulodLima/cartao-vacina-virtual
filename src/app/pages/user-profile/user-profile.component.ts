import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../shared/pessoa';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';

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

  constructor(private formBuilder: FormBuilder,
              private pessoasService: PessoasService) {
  }

  ngOnInit() {
    this.formPerson = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[\s\S]{5,40}$/)]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
      sexType: ['', Validators.required],
      fathersName: ['', [Validators.required, Validators.pattern(/^[\s\S]{5,40}$/)]],
      mothersName: ['', [Validators.required, Validators.pattern(/^[\s\S]{5,40}$/)]],
      address: this.formBuilder.group({
        zipCode: ['', [Validators.required]],
        city: ['', Validators.required],
        street: ['', Validators.required],
        state: ['', Validators.required],
        complement: [''],
        neighborhood: ['', Validators.required]
      }),
      phone: this.formBuilder.group({
        areaCode: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
        number: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]{8,9}\d*)?$/)]]
      }),
      height: this.formBuilder.group({
        height: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)*$/)]],
      }),
      weight: this.formBuilder.group({
        weight: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)*$/)]]
      })
    });

    this.pessoa = JSON.parse(localStorage.getItem('usuario'));

    this.atualizarPerfil(this.pessoa);

  }

  atualizarPerfil(pessoa) {
    this.formPerson.patchValue({
      id: pessoa.id,
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
      localStorage.clear();
      localStorage.setItem('usuario', JSON.stringify(this.formPerson.value));
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
