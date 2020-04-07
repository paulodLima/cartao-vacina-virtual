import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';

@Component({
  selector: 'app-register-vaccine',
  templateUrl: './register-vaccine.component.html',
  styleUrls: ['./register-vaccine.component.css'],
  providers: [VacinaService]
})
export class RegisterVaccineComponent implements OnInit {

  img_vacina = '../../../assets/img/vacina.png';
  crianca = 'bg-info';
  adolecente = 'bg-warning';
  adulto = 'bg-danger';

  vacinas: Vacina[];
  vacinaPorNome: Vacina[];


  constructor(private modalVacina: NgbModal, private vacinaService: VacinaService) { }

  ngOnInit(): void {
    this.vacinaService.getVacinas().subscribe(vacinas => {
      this.vacinas = vacinas;
      console.log(vacinas);
    }, error => { console.log('ocorreu um erro ao listar vacinas', error);
    });
  }

  abrirModal(modal, nome: string) {

    this.vacinaService.getVacinasNome(nome).subscribe(vacina => {
      this.vacinaPorNome = vacina;
      console.log(vacina);
    }, error => {console.log('Ocorreu um erro ao buscar vacina pelo nome', error); });
    this.modalVacina.open(modal);
  }

}
