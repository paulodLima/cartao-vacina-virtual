import {Component, OnInit} from '@angular/core';
import {PessoasService} from '../services/pessoas.service';
import {Pessoa} from '../shared/pessoa';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-icons',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  public pessoas: Pessoa[];
  public pessoaPesquisa: Observable<Pessoa[]>;
  public dataFormatada: string;

  public copy: string;
  searchterm = '';


  constructor(private pessoasService: PessoasService,
              private router: Router) {
  }

  ngOnInit() {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
      console.log(pessoas);
    for (let i = 0; i <= pessoas.length; i++) {
      const dataFormat = this.pessoas[i].birthDate;
      const str = dataFormat.split('-');
      this.dataFormatada = str[2] + '/' + str[1] + '/' + str[0];
      this.pessoas[i].birthDate = this.dataFormatada;
    }
      console.log(this.pessoas);

    }, error => {
      console.log('Erro ao listar pessoas', error);
    });
  }

  pesquisarPessoa(termoPesquisa: string): void {
    this.pessoasService.pesquisarPessoas(termoPesquisa).subscribe(
      (pessoas) => {

      }, error => {
        console.log('erro ao pesquisar pessoa', error.status);
      }
    );
  }

  editarPessoa(uuid: number) {
    this.router.navigate(['editar-pessoa', uuid]);
  }

  pesquisa(event: string) {
    this.searchterm = event;
    this.listarPessoas();
  }
}
