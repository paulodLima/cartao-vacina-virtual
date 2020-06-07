import {Component, Directive, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {

  constructor(private modalVacina: NgbModal) { }

  ngOnInit() {}

  abrirModal() {
    window.open('https://www.google.com/maps/search/postos+de+saude+brasilia/@-15.7840999,-48.1133018,11z','','width=1200,height=800');
  }
}
