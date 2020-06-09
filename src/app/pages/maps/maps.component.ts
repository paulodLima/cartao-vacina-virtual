import {Component, Directive, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VacinaService} from '../services/vacina.service';
import {Router} from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {
  private locais: any;

  constructor(private modalVacina: NgbModal,
              private vacinaService: VacinaService,
              private router: Router) { }

  ngOnInit() {
    this.listarLocais();
  }

  listarLocais() {
      this.vacinaService.getLocais().subscribe(locais => {
          console.log('busca realizada com sucesso', locais);
          this.locais = locais;
      }, error => console.log('erro ao listar locais', error));
  }

  abrirModal() {
    window.open('https://www.google.com/maps/search/postos+de+saude+brasilia/@-15.7840999,-48.1133018,11z', '', 'width=1200,height=800');
  }

  editarLocal(uuid: string) {
    this.router.navigate(['editar-local', uuid]);
  }
}
