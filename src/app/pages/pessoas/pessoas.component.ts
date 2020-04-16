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

  public copy: string;

  constructor(private pessoasService: PessoasService,
              private router: Router) {
  }

  ngOnInit() {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoasService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
    }, error => {
      console.log('Erro ao listar pessoas', error);
    });
  }

  pesquisarPessoa(termoPesquisa: string): void {
    console.log(termoPesquisa);
    this.pessoasService.pesquisarPessoas(termoPesquisa).subscribe(
      (pessoas) => {
        console.log(pessoas);
      }, error => {
        console.log('erro ao pesquisar pessoa', error.status);
      }
    );
  }

  editarPessoa(documentNumber: string) {
    this.router.navigate(['editar-pessoa', documentNumber]);
  }
}
