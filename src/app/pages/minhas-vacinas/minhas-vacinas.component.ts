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
  public vacinaPorNome: Vacina;
  private uniadeSaude: string;
  private dataFormatada: string;

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
      this.historico = historico;
      this.buscarVacinas();
    }, error => console.log('erro ao listar historico', error));
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

    for (let i = 0; i <= this.historico.length; i++) {
      if ( this.historico[i].dosagesInformation[0].applied === false) {
        this.uniadeSaude = '';
        this.dataFormatada = '';
      } else {
            if (this.vacinaPorNome.uuid === this.historico[i].vaccineUuid) {
                this.uniadeSaude = this.historico[i].dosagesInformation[0].healthCenter.name;
                this.formatarData(this.historico[i].dosagesInformation[0].applicationDate);
                console.log('historico por nome', this.historico[i]);
                console.log('vacina por nome', this.vacinaPorNome);
                break;
            }}
    }
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

    const boolTomada = (/true/i).test(tomada);
    const boolObrigatoria = (/true/i).test(obrigatoria);

    switch (true) {
      case (boolTomada === false) && (boolObrigatoria === false):

        this.buscarHistoricoNaoObgTmd(false, false);

        break;

      case (boolTomada === false) && boolObrigatoria === true:
        this.buscarHistoricoObg(boolObrigatoria, boolTomada);
        break;

      case boolTomada === true && (boolObrigatoria === false):
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

  private formatarData(dosagesInformation) {
    const dataFormat = dosagesInformation;
    const str = dataFormat.split('-');
    this.dataFormatada = str[2] + '/' + str[1] + '/' + str[0];
  }
}
