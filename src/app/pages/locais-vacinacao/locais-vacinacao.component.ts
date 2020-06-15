import { Component, OnInit } from '@angular/core';
import {PessoasService} from '../services/pessoas.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VacinaService} from '../services/vacina.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-locais-vacinacao',
  templateUrl: './locais-vacinacao.component.html',
  styleUrls: ['./locais-vacinacao.component.css']
})
export class LocaisVacinacaoComponent implements OnInit {

  public formLocais: FormGroup;
  public cepvalico = false;
  public uuid: string;
  public name: '';
  public sucesso: boolean;
  public mensagemErro: string;
  public erro: any;
  cefMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  telMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private pessoasService: PessoasService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private vacinaService: VacinaService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.formLocais = this.formBuilder.group({
      name: ['', [Validators.required]],
      openingHours: ['', [Validators.required]],
      address: this.formBuilder.group({
      zipCode: ['', [Validators.required]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      state: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required]
    }),
      phone: this.formBuilder.group({
      areaCode: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]{0,3}\d*)?$/)]],
      number: ['', [Validators.required]]
    })
    });


    this.route.params.pipe(
      map((params) => params.uuid ),
      switchMap(uuid => this.vacinaService.getLocalUuid(this.uuid = uuid))
    ).subscribe(local => this.atualizarFormulario(local));
  }

  public buscarCep(cep: string): void {
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {

        this.pessoasService.buscarCep(cep).subscribe(endereco => {

          this.formLocais.patchValue({
            address: ({
              city: endereco.localidade,
              neighborhood: endereco.logradouro,
              state: endereco.uf,
              street: endereco.bairro,
              complement: endereco.complemento
            })
          });
        }, error1 => {
          this.cepvalico = true;
          console.log('ocorreu um erro ao listar o cep', error1);
        });
      }
    }
  }

  cadastrar() {
    console.log(this.formLocais.value);
    this.vacinaService.criarLocal(this.formLocais.value).subscribe(local => {
        this.formLocais.reset();
    }, error => console.log('erro ao cadastrar local', error));
  }

   atualizarFormulario(local) {
    console.log(local);
    this.formLocais.patchValue({
      name: local.name,
      openingHours: local.openingHours,
      address: ({
      city: local.address.city,
      neighborhood: local.address.neighborhood,
      zipCode: local.address.zipCode,
      state: local.address.state,
      street: local.address.street,
      complement: local.address.complement
    }),
      phone: ({
      areaCode: local.phone.areaCode,
      number: local.phone.number
    })
    });
  }

  atualizar() {
    this.vacinaService.AtualizarLocalUuid(this.uuid, this.formLocais.getRawValue()).subscribe(local => {
      this.router.navigateByUrl('/locais');
      console.log('atualizado com sucesso');
    }, error => console.log('erro ao atualizar', error));
  }
}
