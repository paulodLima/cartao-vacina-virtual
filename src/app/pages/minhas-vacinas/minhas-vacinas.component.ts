import {Component, OnInit} from '@angular/core';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Pessoa} from '../shared/pessoa';
import {AuthService} from '../../core/auth.service';
import {PessoasService} from '../services/pessoas.service';

@Component({
  selector: 'app-minhas-vacinas',
  templateUrl: './minhas-vacinas.component.html',
  styleUrls: ['./minhas-vacinas.component.css']
})
export class MinhasVacinasComponent implements OnInit {

  public historico: Vacina[] = [];
  public vacinas: Vacina[] = [];
  public pessoaUuid: string;
  img_vacina = '../../../assets/img/vacina.png';
  public vacinaPorNome: Vacina[];

  constructor(private vacinaService: VacinaService,
              private modalVacina: NgbModal,
              private authService: AuthService,
              private pessoasService: PessoasService) {
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.buscarUuid();
  }

  buscarUuid() {
    this.pessoasService.pesquisarPessoasEmail(this.authService.token.username).subscribe(usuario => {
      this.pessoaUuid = usuario[0].uuid;
      this.buscarHistorico(usuario[0].uuid);
    }, error => console.log('erro ao consultar pessoa', error));
  }

  buscarHistorico(uuid?) {

    this.vacinaService.getHistoricoVacina(uuid).then(async historico => {
      this.historico = await historico;
    }, error => console.log('erro ao listar historico', error));

    this.buscarVacinas();
  }

  buscarVacinas() {
    this.historico.forEach((s, k) => {
      this.vacinaService.getVacinaUuid(s.vaccineUuid).subscribe(vacina => {
        this.vacinas = this.vacinas.concat(vacina);
      }, error => console.log('erro ao listar vacina por uuis', error));
    });

  }

  abrirModal(modal, pessoa: Pessoa) {
    this.vacinaService.getVacinasNome(pessoa.uuid).subscribe(vacina => {
      this.vacinaPorNome = vacina;
      console.log(this.vacinaPorNome);
    }, error => {
      console.log('Ocorreu um err' +
        '\o ao buscar vacina pelo nome', error);
    });


    this.modalVacina.open(modal);
  }

  fechar(modal) {
    this.modalVacina.dismissAll(modal);
  }

  aplicada(tomada: string, obrigatoria: string) {

    let boolTomada = (/true/i).test(tomada);
    let boolObrigatoria = (/true/i).test(obrigatoria);

    switch (true) {
      case tomada === '--' && obrigatoria === '--':
        this.buscarHistoricoNaoObgTmd(false, false);
        this.buscarHistorico();
        break;

      case (tomada === '--' || boolTomada === false) && (obrigatoria === '--' || boolObrigatoria === false):
        if (tomada === '--' && obrigatoria === '--') {
          boolObrigatoria = false;
          boolTomada = false;
        }
        this.buscarHistoricoNaoObgTmd(false, false);
        this.buscarHistorico();
        break;

      case (tomada === '--' || boolTomada === false) && boolObrigatoria === true:
        if (tomada === '--') {
          boolTomada = false;
        }
        this.buscarHistoricoObg(boolObrigatoria, boolTomada);
        break;

      case boolTomada === true && (obrigatoria === '--' || boolObrigatoria === false):
        if (obrigatoria === '--') {
          boolObrigatoria = false;
        }
        this.buscarHistoricoTmd(boolTomada, boolObrigatoria);
        break;

      case boolTomada === true && boolObrigatoria === true:
        this.buscarHistoricoObgTmd(boolTomada, boolObrigatoria);
        break;

      case boolTomada === false && boolObrigatoria === false:
        this.buscarHistoricoNaoObgTmd(boolTomada, boolObrigatoria);
        break;
    }
  }

  private buscarHistoricoObgTmd(boolTomada, boolObrigatoria) {
    this.vacinaService.getHistoricoVacinaFiltroObgTmd(this.pessoaUuid, boolTomada, boolObrigatoria).subscribe(historico => {
      this.historico = historico;
      this.vacinas = [];
      this.buscarVacinas();
    }, error => console.log('erro ao listar historico', error));
  }

  private buscarHistoricoNaoObgTmd(boolTomada, boolObrigatoria) {
    this.vacinaService.buscarHistoricoNaoObgTmd(this.pessoaUuid, boolTomada, boolObrigatoria).subscribe(historico => {
      this.historico = historico;
      this.vacinas = [];
      this.buscarVacinas();
    }, error => console.log('erro ao listar historico', error));
  }

  private buscarHistoricoObg(boolObrigatoria, boolTomada) {
    this.vacinaService.buscarHistoricoObg(this.pessoaUuid, boolTomada, boolObrigatoria).subscribe(historico => {
      this.historico = historico;
      this.vacinas = [];
      this.buscarVacinas();
    }, error => console.log('erro ao listar historico', error));
  }

  private buscarHistoricoTmd(boolTomada, boolObrigatoria) {
    this.vacinaService.buscarHistoricoObgTmd(this.pessoaUuid, boolTomada, boolObrigatoria).subscribe(historico => {
      this.historico = historico;
      this.vacinas = [];
      this.buscarVacinas();
    }, error => console.log('erro ao listar historico', error));
  }
}
