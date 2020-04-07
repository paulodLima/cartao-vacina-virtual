import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';

@Component({
  selector: 'app-register',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [PessoasService]
})
export class RegistrarComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private pessoasService: PessoasService) { }

  public  formPerson: FormGroup;
  public fullName = '';
  public documentNumber = '';
  public email = '';
  public birthDate = '';
  public zipCode = '';
  public city = '';
  public street = '';
  public state = '';
  public neighborhood = '';
  public complement = '';
  public fathersName = '';
  public mothersName = '';
  public height = '';
  public weight = '';

  ngOnInit(): void {
    this.formPerson = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      documentNumber: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(9)]],
      fathersName: ['', [Validators.required, Validators.minLength(8)]],
      mothersName: ['', [Validators.required, Validators.minLength(8)]],
      address: this.formBuilder.group({
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        state: ['', Validators.required],
        complement: [''],
        neighborhood: ['', Validators.required]
      }),
      height: this.formBuilder.group({
        height: ['', [Validators.required, Validators.pattern(/^[]0-9_\-]+$/)]],
        weight: ['', [Validators.required, Validators.pattern(/^[]0-9_\-]+$/)]]
      })
    });
  }


  cadastrar() {
    console.log('passando aqui full name', this.formPerson.value, this.fullName);
  }

  public buscarCep(cep: string): void {

    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {

        this.pessoasService.buscarCep(cep).subscribe(endereco => {
          console.log(endereco)
          this.city = endereco.localidade;
          this.zipCode = endereco.cep;
          this.neighborhood = endereco.logradouro;
          this.state = endereco.uf;
          this.street = endereco.bairro;
          this.complement = endereco.complemento;
        }, error => {
          console.log('ocorreu um erro ao listar o cep', error);
        });
      }
    }
  }

  get wight() {
    return this.formPerson.get('height').get('weight');
  }

}
