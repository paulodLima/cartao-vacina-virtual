import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PessoasService} from '../services/pessoas.service';
import {Pessoa} from '../shared/pessoa';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';

@Component({
  selector: 'app-adicionar-vacina',
  templateUrl: './adicionar-vacina.component.html',
  styleUrls: ['./adicionar-vacina.component.css']
})
export class AdicionarVacinaComponent implements OnInit {

  public formAddVacina: FormGroup;
  public pessoas: Pessoa[];
  public pessoa: Pessoa;
  public vacinas: Vacina[];
  public vacina: Vacina;
  public searchterm = '';
  public searchtermVacina = '';
  public termo = false;
  public termoVacinas = false;
  public vacinaa = '';
  public paciente = '';
  public sucesso = false;
  public required = false;
  public vacinauuid = '';
  private obrigatorio = false;

  constructor(private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private vacinaService: VacinaService) { }

  ngOnInit(): void {
    this.listarPessoas();
    this.listarVacinas();
  }
  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {
        this.pessoas = pessoas;
    }, erro => {
      console.log('Erro ao listar pessoas', erro);
    });
  }

  listarVacinas() {
    this.vacinaService.getVacinas().subscribe(vacinas => {
      this.vacinas = vacinas;
    }, error => console.log('erro ao listar vacinas', error));
  }

  pesquisa(event: string) {
    if (event.length <= 2) {
      this.termo = false;
    } else {
    this.searchterm = event;
    this.termo = true;
    this.listarPessoas();
    }
  }

  selecionado(pessoaSelecionada) {
    this.paciente = pessoaSelecionada.fullName;
    this.pessoa = pessoaSelecionada;
    this.termo = false;
  }

  pesquisVacina(event) {
    if (event.length <= 2) {
      this.termoVacinas = false;
    } else {
      this.searchtermVacina = event;
      this.termoVacinas = true;
      this.listarVacinas();
    }
  }

  vacinaSelecionada(vacina) {
    this.vacinaa = vacina.name;
    this.vacina = vacina;
    this.termoVacinas = false;
  }

  formVacina() {
    this.formAddVacina = this.formBuilder.group({
      vaccines: this.buildervacina()
    });
  }

  buildervacina() {
    this.vacinauuid = this.vacina.uuid;
    if (this.obrigatorio) {
      this.obrigatorio = true;
    }
   return this.formBuilder.array([
      new FormControl({'required': this.obrigatorio, vaccineUuid: this.vacinauuid})]);
  }

  adicionarVacina(obrigatorio) {
     this.obrigatorio = obrigatorio;
      this.vacinaService.geCalendarioPessoa(this.pessoa.uuid).subscribe(calendario => {
        this.buildervacina();
        this.formVacina();
        console.log('dentro do adicionar 2', this.formAddVacina.value);
        this.vacinaService.updateDeCalendario(this.formAddVacina.value, calendario[0].uuid).subscribe(vaccineCard => {
          this.formAddVacina.reset();
          this.sucesso = true;

          setTimeout(() => {
            this.sucesso = false;
          }, 6000);

        }, error => console.log('erro ao cadastrar vaccineCard', error));

      }, error => console.log('erro ao listar calendario de pessoa', error));

        this.formAddVacina.reset();
      }

// dataAtualFormatada() {
// const data = new Date(),
//    dia  = data.getDate().toString(),
//    diaF = (dia.length === 1) ? '0' + dia : dia,
//    mes  = (data.getMonth() + 1).toString(),
//    mesF = (mes.length === 1) ? '0' + mes : mes,
//    anoF = data.getFullYear();
//    this.dataFormatada = anoF + '-' + mesF + '-' + diaF;
// }
}
