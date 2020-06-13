import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';
import {Pessoa} from '../shared/pessoa';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css']
})
export class CadastrarPessoaComponent implements OnInit {
  private pessoa: Pessoa;
  private value: FormControl[] = [];
  private uuid: string;
  private permissao: string;
  public rolesId: string;
  public rolesName: string;
  public listRoles: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private route: ActivatedRoute,
              private modal: NgbModal,
              private vacinaService: VacinaService,
              private authService: AuthService) {
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
  public disableds = false;
  public required = '';
  public array = [''];
  public vacinas: Vacina[];
  public erro = false;
  public mensagemErro: string;
  public sucesso = false;
  valida = false;
  public password: any;

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.route.params.pipe(
      map((params) => params.id),
      switchMap(id => this.pessoasService.consutarPessoa(this.id = id))
    ).subscribe(pessoa => this.atualizarFormulario(pessoa));
    this.formPersonBulder();
    this.listarVacinas();
    if (this.id !== undefined) {
      this.disableds = true;
    }
    this.listRoles = JSON.parse(this.authService.roles);

  }

  formPersonBulder() {
    this.formPerson = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{5,40}$/)]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
      sexType: ['', Validators.required],
      fathersName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{5,40}$/)]],
      mothersName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{5,40}$/)]],
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
        number: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]{8,9}\d*)?$/)]]
      }),
      height: this.formBuilder.group({
        height: ['', [Validators.required]],
      }),
      weight: this.formBuilder.group({
        weight: ['', [Validators.required]]
      }),
      credential: this.formBuilder.group({
        password: ['', [Validators.required]],
        roles: this.bulderRoles()
      })
    });
  }

  bulderRoles() {
    return this.formBuilder.array([
      new FormControl({'id': this.rolesId, 'name': this.rolesName})]);
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

  teste(roles, event) {
    this.rolesId = roles;
    this.rolesName = event.target.options[event.target.options.selectedIndex].text;
    this.formPersonBulder();
  }

  cadastrar() {
    this.formPerson.patchValue({
      weight: ({
        weight: `${this.formPerson.get('weight.weight').value}`
      }),
      height: ({
        height: `${this.formPerson.get('height.height').value}`
      })
    });
    console.log(this.formPerson.value);

    if (this.formPerson.valid) {

      this.pessoasService.criarPessoa(this.formPerson.value).subscribe(pessoa => {
        this.uuid = pessoa.uuid;
        console.log('pessao criada', pessoa);
        this.criarCalendario(pessoa);
        this.pessoasService.cadastrarCalendario(this.formCalendario.value).then(calendario => {
          this.router.navigate(['/register-vaccine', this.uuid]);
        }, error => console.log('erro ao cadastrar calendario de vacina', error));
      }, erro => {
        console.log('erro ao cadastrar pessoa', erro.error.messages);
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

  atualizar() {
    if (this.formPerson.valid) {
      this.formPerson.patchValue({
        weight: ({
          weight: `${this.formPerson.get('weight.weight').value}`
        }),
        height: ({
          height: `${this.formPerson.get('height.height').value}`
        })
      });
      this.pessoasService.atualizarPessoa(this.id, this.formPerson.value).subscribe(pessoa => {
        this.formPerson.reset();
        this.router.navigateByUrl('/pessoas');
      }, error1 => console.log(error1));
    }
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

    this.formCalendario = this.formBuilder.group({
      personUuid: pessoa.uuid,
      vaccines: this.bulderVaccines()
    });

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

  comparar(senha, confirmar, permissao) {
    if (confirmar.length >= 5) {
      if (senha !== '' && confirmar !== '' && senha === confirmar) {
        this.permissao = permissao;
        this.valida = false;
      } else {
        this.valida = true;
      }
    }
  }

  getRoles() {
    const teste = JSON.stringify(this.authService.roles);
    this.listRoles = teste;
    console.log('teste', this.listRoles);
  }
}
