import {Component, Directive, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VacinaService} from '../services/vacina.service';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {
  public locais: any;
  public searchterm: string;

  constructor(private modalVacina: NgbModal,
              private vacinaService: VacinaService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.authService.logout();
    }
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

  listarEnderecoPag1() {
    this.vacinaService.getLocais().subscribe(locais => {
      this.locais = locais;
    }, error => console.log('erro ao listar locais', error));
  }

  listarenderecoPag2() {
    this.vacinaService.getLocaisPag2().subscribe(locais => {
      this.locais = locais;
    }, error => console.log('erro ao listar locais', error));
  }

  listarenderecoPag3() {
    this.vacinaService.getLocaisPag3().subscribe(locais => {
      this.locais = locais;
    }, error => console.log('erro ao listar locais', error));
  }

  apagarLocal(uuid: any) {
    this.vacinaService.apagarLocal(uuid).subscribe(locais => {
      this.listarEnderecoPag1();
    }, error => console.log('erro ao listar locais', error));
  }
}
