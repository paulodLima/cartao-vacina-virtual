import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-vaccine',
  templateUrl: './register-vaccine.component.html',
  styleUrls: ['./register-vaccine.component.css']
})
export class RegisterVaccineComponent implements OnInit {

  public vacina = '../../../assets/img/vacina.png';


  constructor(private modalVacina: NgbModal) { }

  ngOnInit(): void {
  }

  abrirModal(modal) {
    this.modalVacina.open(modal);
  }

}
