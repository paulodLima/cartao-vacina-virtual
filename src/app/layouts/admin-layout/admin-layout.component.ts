import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../pages/services/login.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  mostrarMenu = true;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.loginAutenticado = false;
    localStorage.clear();
  }

  ocutar() {
    this.mostrarMenu = false;
  }
  mostrar() {
    this.mostrarMenu = true;
  }
}
