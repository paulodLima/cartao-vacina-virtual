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
  public dataFormatada = '';
  public vacinaa = '';
  public paciente = '';
  public sucesso = false;
  public required = false;
  public vacinauuid = '';

  constructor(private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private vacinaService: VacinaService) { }

  ngOnInit(): void {
    this.dataAtualFormatada();
    this.listarPessoas();
    this.listarVacinas();
  }

  buildervacina(obrigatorio: any, vacina: any) {

    return this.formBuilder.array([
            new FormControl({'required': this.required, vaccineUuid: this.vacinauuid})]);
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

  adicionarVacina(obrigatorio: any, vacina: any) {
    this.required = obrigatorio;
    this.vacinauuid = vacina;
    if (this.required) {
      this.required = true;
    }
    this.formAddVacina = this.formBuilder.group({
      vaccines: this.buildervacina(this.required, this.vacinauuid)
    });

    console.log(this.formAddVacina.value);
    if (this.formAddVacina.valid) {
      this.formAddVacina.patchValue({
          applicationDate: this.dataFormatada,
          personUuid: this.pessoa.uuid,
          vaccineUuid: this.vacina.uuid
      });
      if (this.formAddVacina.valid) {
        this.vacinaService.cadastrarVaccineCard(this.formAddVacina.value).subscribe(vaccineCard => {
            this.formAddVacina.reset();
          this.sucesso = true;

          setTimeout(() => {
            this.sucesso = false;
          }, 6000);
        }, error => console.log('erro ao cadastrar vaccineCard', error));
        console.log('form adicionar vacina', this.formAddVacina.value);
        this.formAddVacina.reset();
      }
    }
  }

   dataAtualFormatada() {
    const data = new Date(),
      dia  = data.getDate().toString(),
      diaF = (dia.length === 1) ? '0' + dia : dia,
      mes  = (data.getMonth() + 1).toString(),
      mesF = (mes.length === 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
      this.dataFormatada = anoF + '-' + mesF + '-' + diaF;
  }
}
