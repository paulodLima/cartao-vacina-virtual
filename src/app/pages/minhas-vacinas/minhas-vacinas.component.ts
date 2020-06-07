import { Component, OnInit } from '@angular/core';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Pessoa} from '../shared/pessoa';

@Component({
  selector: 'app-minhas-vacinas',
  templateUrl: './minhas-vacinas.component.html',
  styleUrls: ['./minhas-vacinas.component.css']
})
export class MinhasVacinasComponent implements OnInit {

  private historico: Vacina[];
  public vacinas: Vacina[] = [];
  public pessoaString = localStorage.getItem('usuario');
  public pessoaJson = JSON.parse(this.pessoaString);
  img_vacina = '../../../assets/img/vacina.png';
  private vacinaPorNome: Vacina[];

  constructor(private vacinaService: VacinaService,
              private modalVacina: NgbModal) { }

  ngOnInit(): void {
    this.buscarHistorico();
  }

  buscarHistorico() {
    this.vacinaService.getHistoricoVacina(this.pessoaJson.uuid).subscribe(historico => {
        this.historico = historico;
        this.buscarVacinas();
    }, error => console.log('erro ao listar historico', error));
  }

  buscarVacinas() {

    for (let i = 0; i <= this.historico.length; i++) {
        this.vacinaService.getVacinaUuid(this.historico[i].vaccineUuid).subscribe(vacina => {
            this.vacinas = this.vacinas.concat(vacina);
        }, error => console.log('erro ao listar vacina por uuis', error));
    }
    console.log('vacinas', this.vacinas);
  }

  abrirModal(modal, pessoa: Pessoa) {
    this.vacinaService.getVacinasNome(pessoa.uuid).subscribe(vacina => {
      this.vacinaPorNome = vacina;
    }, error => {console.log('Ocorreu um err' +
      '\o ao buscar vacina pelo nome', error); });

    this.modalVacina.open(modal);
  }
}
