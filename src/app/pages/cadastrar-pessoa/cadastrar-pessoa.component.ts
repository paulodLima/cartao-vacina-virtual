import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';
import {Pessoa} from '../shared/pessoa';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css']
})
export class CadastrarPessoaComponent implements OnInit {
  private pessoa: Pessoa;
  private value: FormControl[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private route: ActivatedRoute,
              private modal: NgbModal,
              private vacinaService: VacinaService) {
  }

  public formPerson: FormGroup;
  public formCalendario: FormGroup;
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
  public number = '';
  public areaCode = '';
  public sexType = '';
  public cepvalico = false;
  public id: string;
  public vaccineUuid = '';
  public required = '';
  public array = [''];
  public vacinas: Vacina[];
  public erro = false;
  public mensagemErro: string;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  ngOnInit(): void {
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

    this.route.params.pipe(
      map((params) => params.id ),
      switchMap(id => this.pessoasService.consutarPessoa(this.id = id))
    ).subscribe(pessoa => this.atualizarFormulario(pessoa));

    this.listarVacinas();
  }

  atualizarFormulario(pessoa) {

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
        height: pessoa.height.height
      }),
      weight: ({
        weight: pessoa.weight.weight
      })
    });
  }

  cadastrar() {
    if (this.formPerson.valid && this.id === undefined) {
      this.pessoasService.criarPessoa(this.formPerson.value).subscribe(pessoa => {
        this.router.navigateByUrl('/register-vaccine');
        this.pessoa = pessoa;
        this.criarCalendario(pessoa);
        this.pessoasService.cadastrarCalendario(this.formCalendario.value).subscribe(calendario => {

        }, error => console.log('erro ao cadastrar calendario de vacina', error));
      }, erro => {console.log('erro ao cadastrar pessoa', erro.error.messages);
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
    } else {
      console.log(this.formPerson.value);
      this.pessoasService.atualizarPessoa(this.id, this.formPerson.value).subscribe(pessoa => {
          this.formPerson.reset();
          this.router.navigateByUrl('/pessoas');
      }, error1 => console.log(error1)); }
  }

  public buscarCep(cep: string): void {
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {

        this.pessoasService.buscarCep(cep).subscribe(endereco => {

          this.formPerson.patchValue({
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

  criarCalendario(pessoa) {

    this.formCalendario =  this.formBuilder.group({
      personUuid: pessoa.uuid,
      vaccines : this.bulderVaccines()
    });

    console.log(this.formCalendario.value);
  }

  bulderVaccines() {
    for (let i = 0; i < this.vacinas.length; i++) {

       this.value = this.value.concat(new FormControl({'required': true, 'vaccineUuid': this.vacinas[i].uuid}));

    }
     return this.formBuilder.array(this.value);
  }

  listarVacinas() {
    this.vacinaService.getVacinas().subscribe(vacinas => {
          this.vacinas = vacinas;
    }, erro => console.log('erro ao listar vacinas', erro));
  }

  voltar() {
    this.router.navigateByUrl('/pessoas');
  }
}
