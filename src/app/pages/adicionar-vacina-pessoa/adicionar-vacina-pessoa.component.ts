import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Pessoa} from '../shared/pessoa';
import {Vacina} from '../shared/vacina.model';
import {PessoasService} from '../services/pessoas.service';
import {VacinaService} from '../services/vacina.service';
import {Unidades} from '../shared/unidades';

@Component({
  selector: 'app-adicionar-vacina-pessoa',
  templateUrl: './adicionar-vacina-pessoa.component.html',
  styleUrls: ['./adicionar-vacina-pessoa.component.css']
})
export class AdicionarVacinaPessoaComponent implements OnInit {


  public formDosage: FormGroup;
  public pessoas: Pessoa[];
  public pessoa: Pessoa;
  public vacinas: Vacina[] = [];
  public vacina: Vacina;
  public searchterm = '';
  public searchtermVacina = '';
  public searchtermLocal = '';
  public termo = false;
  public termoVacinas = false;
  public termoLocal = false;
  public vacinaa = '';
  public paciente = '';
  public sucesso = false;
  public required = false;
  public locais: any;
  public local: Unidades;
  public locall = '';
  public dataFormatada: string;
  public historico: Vacina[] = [];
  public mensagem: string;

  constructor(private formBuilder: FormBuilder,
              private pessoasService: PessoasService,
              private vacinaService: VacinaService) { }

  ngOnInit(): void {
    this.listarPessoas();
    this.listarLocais();
    this.dataAtualFormatada();
  }
  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
    }, erro => {
      console.log('Erro ao listar pessoas', erro);
    });
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
    this.buscarHistorico();
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

  pesquisLocal(event) {
    if (event.length <= 2) {
      this.termoLocal = false;
    } else {
      this.searchtermLocal = event;
      this.termoLocal = true;
      this.listarLocais();
    }
  }

  localSelecionada(local) {
    console.log(local);
    this.locall = local.name;
    this.local = local;
    this.termoLocal = false;
  }

  listarLocais() {
    this.vacinaService.getLocais().subscribe(locais => {
      console.log('busca realizada com sucesso', locais);
      this.locais = locais;
    }, error => console.log('erro ao listar locais', error));
  }

  listarVacinas() {
    this.vacinaService.getVacinas().subscribe(vacinas => {
      this.vacinas = vacinas;
    }, error => console.log('erro ao listar locais', error));
  }

  aplicarDosagem() {
    this.formDosage = this.formBuilder.group({
      applicationDate:  this.dataFormatada ,
      applied: true,
      healthCenterUuid: this.local.uuid
    });

    console.log('form dosagem', this.formDosage);
    for (let i = 0; i <= this.historico.length; i++ ) {
      if (this.historico[i].vaccineUuid === this.vacina.uuid) {

        this.vacinaService.atualizarDosagem(this.historico[i].dosagesInformation[0].uuid, this.formDosage.value).subscribe(dosage => {
          this.locall = '';
          this.vacinaa = '';
          this.paciente = '';
          this.sucesso = true;
          setTimeout(() => {
            this.sucesso = false;
          }, 3000);
        }, errorrs => console.log('dosagem aplicadas com sucesso', errorrs));

      }
    }
  }
  buscarHistorico() {
    this.vacinaService.getHistoricoVacina(this.pessoa.uuid).then(historico => {

      Object.assign(this.historico, historico);
      this.buscarVacinas();

    }, error => console.log('erro ao listar historico', error));

  }

  buscarVacinas() {
    console.log('antes', this.historico);
    for (let i = 0; i <= this.historico.length; i++) {
      this.vacinaService.getVacinaUuid(this.historico[i].vaccineUuid).subscribe(vacina => {
        this.vacinas = this.vacinas.concat(vacina);
      }, error => console.log('erro ao listar vacina por uuis', error));
    }

    console.log('vacinas', this.vacinas);

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
