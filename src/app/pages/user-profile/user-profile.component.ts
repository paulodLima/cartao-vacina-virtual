import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../shared/pessoa';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private pessoa: Pessoa;
  public formPerson: FormGroup;
  edit = true;
  public idade;

  constructor(private formBuilder: FormBuilder) { }

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
        weight: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)*$/)]]
      })
    });

    this.pessoa = JSON.parse(localStorage.getItem('usuario'));
    console.log('listando pessoa', this.pessoa);

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
        weight: pessoa.height.weight
      })
    });
  }

  editar() {
    this.edit = false;
  }
}
