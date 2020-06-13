import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endereco} from '../shared/endereco';
import {Pessoa} from '../shared/pessoa';
import {URL_API_CEP, URL_API_PESSOA, URL_API_VACCINECARD, URL_AUTH} from '../../app.api';

import {Email} from '../shared/email';
import {retry} from 'rxjs/operators';


@Injectable()
export class PessoasService {


  constructor(private http: HttpClient) {
  }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}`);
  }

  public buscarCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${URL_API_CEP}/${cep}/json`);
  }

  public criarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post(`${URL_API_PESSOA}`, pessoa);
  }

  public pesquisarPessoas(termoPesquisa: string): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}?fullName_like=${termoPesquisa}`).pipe(retry(10));
  }

  public consutarPessoa(termoPesquisa: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${URL_API_PESSOA}/${termoPesquisa}`);
  }

  public atualizarPessoa(id: string, pessoa: Pessoa): Observable<any> {
    return this.http.patch(`${URL_API_PESSOA}/${id}`, pessoa);
  }

  public salvarAnexo (anexo: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${URL_API_VACCINECARD}/mail/anexo`, anexo);
  }

  public enviarEmail (email: Email): Observable<Email> {
    return this.http.post<Email>(`${URL_API_VACCINECARD}/mail`, email);
  }

  public cadastrarCalendario(calendario): Observable<any> {
    return this.http.post(`${URL_API_VACCINECARD}/calendar`, calendario);
  }

  public pesquisarPessoasEmail(termoPesquisa: string): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}?email=${termoPesquisa}`);
  }
}
