import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endereco} from '../shared/endereco';
import {Pessoa} from '../shared/pessoa';
import {URL_API_CEP, URL_API_PESSOA} from '../../app.api';
import {retry} from 'rxjs/operators';
import {Email} from '../shared/email';

@Injectable()
export class PessoasService {

  constructor(private http: HttpClient) {
  }

  public listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}`);
  }

  public buscarCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${URL_API_CEP}/${cep}/json`);
  }

  public criarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    console.log(pessoa);
    return this.http.post<Pessoa>(`${URL_API_PESSOA}/insert`, pessoa);
  }

  public pesquisarPessoas(termoPesquisa: string): Observable<Pessoa[]> {
    console.log('pesquisa pessoa ', this.http.get<Pessoa[]>(`${URL_API_PESSOA}?fullName_like=${termoPesquisa}`).pipe(retry(10)));
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}?fullName_like=${termoPesquisa}`).pipe(retry(10));
  }

  public consutarPessoa(termoPesquisa: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${URL_API_PESSOA}/${termoPesquisa}`);
  }

  public atualizarPessoa(id: number, pessoa: Pessoa): Observable<any> {
    return this.http.patch(`${URL_API_PESSOA}/${id}`, pessoa);
  }

  public salvarAnexo (anexo: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${URL_API_PESSOA}/anexo`, anexo);
  }

  public enviarEmail (email: Email): Observable<Email> {
    return this.http.post<Email>(`${URL_API_PESSOA}`, email);
  }

}
