import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-register-vaccine',
  templateUrl: './register-vaccine.component.html',
  styleUrls: ['./register-vaccine.component.css'],
  providers: [VacinaService]
})
export class RegisterVaccineComponent implements OnInit {

  img_vacina = '../../../assets/img/vacina.png';

  vacinas: Vacina[] = [];
  vacinaPorNome: Vacina[];
  searchterm = '';
  private locais: any;
  private uuidVacina: string;
  public formDosage: FormGroup;
  private dataFormatada: string;
  private mensagem: string;
  private id: string;
  private historico: Vacina[] = [];
  public focus = false;

  constructor(private modalVacina: NgbModal,
              private vacinaService: VacinaService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.listarLocais();
    this.dataAtualFormatada();


    this.route.params.subscribe(objeto => {
      this.id = objeto.uuid;

      this.buscarHistorico();

    });

  }

  buscarHistorico() {
    console.log('id', this.id);
    this.vacinaService.getHistoricoVacina(this.id).then(async data => {
      this.historico = await data;
      console.log('hist', this.historico);
      this.buscarVacinas();
    });

  }

  buscarVacinas() {
    console.log('antes', this.historico);
    this.historico.forEach((s, k) => {
      this.vacinaService.getVacinaUuid(s.vaccineUuid).subscribe(vacina => {
        this.vacinas = this.vacinas.concat(vacina);
      }, error => console.log('erro ao listar vacina por uuis', error));
    });
  }

  abrirModal(modal, uuid: string) {
    this.vacinaService.getVacinasNome(uuid).subscribe(vacina => {
      this.vacinaPorNome = vacina;
    }, errors => {
      console.log('Ocorreu um erro ao buscar vacina pelo nome', errors);
    });
    this.modalVacina.open(modal);
  }

  pesquisa(event: string) {
    this.searchterm = event;
  }

  abrirModalAplocar(modalVacina: any, vacina: any) {
    console.log(this.historico);
    this.uuidVacina = vacina.uuid;

    this.modalVacina.open(modalVacina);
  }

  listarLocais() {
    this.vacinaService.getLocais().subscribe(locais => {
      console.log('busca realizada com sucesso', locais);
      this.locais = locais;
    }, errorr => console.log('erro ao listar locais', errorr));
  }

  aplicarDosagem(uuid: any, modal) {

    this.formDosage = this.formBuilder.group({
      applicationDate: this.dataFormatada,
      applied: true,
      healthCenterUuid: uuid
    });

    for (let i = 0; i <= this.historico.length; i++) {
      if (this.historico[i].vaccineUuid === this.uuidVacina) {

        this.vacinaService.atualizarDosagem(this.historico[i].dosagesInformation[0].uuid, this.formDosage.value).subscribe(dosage => {
          this.mensagem = 'Dosagem aplicada com sucesso';
          this.modalVacina.dismissAll(modal);
        }, errorrs => console.log('dosagem aplicadas com sucesso', errorrs));

      }
    }
  }

  dataAtualFormatada() {
    const data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length === 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = (mes.length === 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    this.dataFormatada = anoF + '-' + mesF + '-' + diaF;
  }
}
