import { Component, OnInit } from '@angular/core';
import {PessoasService} from '../Services/PessoasService';

@Component({
  selector: 'app-icons',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  public pessoas: Array<any>;

  public copy: string;
  constructor(private pessoasService: PessoasService) { }

  ngOnInit() {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
      console.log(this.pessoas);
    }, error => {
      console.log('Erro ao listar pessoas', error);
    });
  }
}
