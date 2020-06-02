import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  public vacinas: Vacina[];
  searchterm = '';
  searchtermVacina = '';
  termo = false;
  termoVacinas = false;
  paciente = '';
  vacina = '';

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
    this.termo = false;
    console.log(pessoaSelecionada);
  }

  pesquisVacina(event) {
    console.log(event);
    if (event.length <= 2) {
      this.termoVacinas = false;
    } else {
      this.searchtermVacina = event;
      this.termoVacinas = true;
      this.listarVacinas();
    }
  }

  vacinaSelecionada(vacina) {
    this.vacina = vacina.name;
    this.termoVacinas = false;
  }
}
