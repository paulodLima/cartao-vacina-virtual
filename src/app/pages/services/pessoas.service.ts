import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endereco} from '../shared/endereco';
import {Pessoa} from '../shared/pessoa';
import {URL_API_CEP, URL_API_PESSOA, URL_API_VACCINECARD} from '../../app.api';
import {retry} from 'rxjs/operators';


@Injectable()
export class PessoasService {


  constructor(private http: HttpClient) {
  }

  public listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}?page=0&size=10&sort=fullName,ASC`);
  }

  public listarPessoasPag2(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}?page=1&size=10&sort=fullName,ASC`);
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

  public enviarEmail(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${URL_API_VACCINECARD}/mail`, formData);
  }

  public async cadastrarCalendario(calendario): Promise<any> {
    return await this.http.post(`${URL_API_VACCINECARD}/calendar`, calendario).toPromise();
  }

  public pesquisarPessoasEmail(termoPesquisa: string): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${URL_API_PESSOA}?email=${termoPesquisa}`);
  }
}
