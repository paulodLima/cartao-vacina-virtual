import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../core/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/locais', title: 'Maps',  icon: 'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/minhas-vacinas', title: 'Minhas vacinas',  icon: 'fas fa-search', class: '' }
];

export const ROUTESADMIN: RouteInfo[] = [
  { path: '/locais', title: 'Locais',  icon: 'ni-tv-2 text-primary', class: ''},
  { path: '/pessoas', title: 'Consulta de Pessoas',  icon: 'fas fa-search', class: '' },
  { path: '/adicionar-vacina', title: 'Adicionar vacina a calendario',  icon: 'ni-planet text-blue', class: '' },
  { path: '/user-profile', title: 'Perfil',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/minhas-vacinas', title: 'Minhas vacinas',  icon: 'fas fa-search', class: '' },
  { path: '/campanha', title: 'Campanha',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/lista-vacinas', title: 'Lista de vacinas',  icon: 'fas fa-search', class: '' },
  { path: '/add-vacina-pessoa', title: 'Aplicar vaciana pessoa',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/cadastrar-vacina', title: 'Cadastrar Nova Vacina',  icon: 'ni-key-25 text-info', class: '' },
  { path: '/cadastrar-pessoa', title: 'Cadastro de pessoa',  icon: 'fas fa-users', class: '' },
  { path: '/cadastrar-postos', title: 'Cadastro de Postos de vacinação',  icon: 'fas fa-users', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;


  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.routes();
  }

  routes() {
    if (this.auth.admin) {
      this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    } else {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }

  }

}
