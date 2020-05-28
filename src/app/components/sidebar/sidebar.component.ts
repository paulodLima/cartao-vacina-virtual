import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {AdminLayoutComponent} from '../../layouts/admin-layout/admin-layout.component';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: ''},
    { path: '/maps', title: 'Maps',  icon: 'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon: 'ni-bullet-list-67 text-red', class: '' },
];

export const ROUTESADMIN: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: ''},
  { path: '/pessoas', title: 'Consulta de Pessoas',  icon: 'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps',  icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/campanha', title: 'Campanha',  icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables',  icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/cadastrar-vacina', title: 'Cadastrar Vacina',  icon: 'ni-key-25 text-info', class: '' },
  { path: '/register-vaccine', title: 'Listar Vacinas',  icon: 'ni-key-25 text-info', class: '' },
  { path: '/cadastrar-pessoa', title: 'Cadastro de pessoa',  icon: 'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Registra-se',  icon: 'ni-circle-08 text-pink', class: '' },
  { path: '/login', title: 'Login',  icon: 'ni-key-25 text-info', class: '' }
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
