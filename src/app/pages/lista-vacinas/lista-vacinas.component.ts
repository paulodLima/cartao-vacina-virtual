import { Component, OnInit } from '@angular/core';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';
import {Pessoa} from '../shared/pessoa';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-lista-vacinas',
  templateUrl: './lista-vacinas.component.html',
  styleUrls: ['./lista-vacinas.component.css']
})
export class ListaVacinasComponent implements OnInit {

  public vacinas: Vacina[];
  public   img_vacina = '../../../assets/img/vacina.png';
  public vacinaPorNome: Vacina[];

  constructor(private vacinaService: VacinaService,
              private modalVacina: NgbModal,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
    this.listarVacinas();
  }

  listarVacinas() {
    this.vacinaService.getVacinas().subscribe(vacinas => {
      this.vacinas = vacinas;
    }, error => console.log('erro ao listar vacinas', error));
  }
  abrirModal(modal, pessoa: Pessoa) {
    this.vacinaService.getVacinasNome(pessoa.uuid).subscribe(vacina => {
      this.vacinaPorNome = vacina;
      console.log(this.vacinaPorNome);
    }, error => {console.log('Ocorreu um err ao buscar vacina pelo nome', error); });

    this.modalVacina.open(modal);
  }

  fechar(modal) {
    this.modalVacina.dismissAll(modal);
  }
}
