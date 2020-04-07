import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endereco} from '../shared/endereco';
import {Pessoa} from '../shared/pessoa';
import {URL_API_CEP, URL_API_PESSOA} from '../../app.api';

@Injectable()
export class PessoasService {

  constructor(private http: HttpClient) {}

   public listarPessoas(): Observable<Pessoa[]> {
      return this.http.get<Pessoa[]>(`${URL_API_PESSOA}`);

     console.log('teste', this.http.get<Pessoa[]>(URL_API_PESSOA));
   }

    public buscarCep(cep: string): Observable<Endereco> {
      return this.http.get<Endereco>(`${URL_API_CEP}/${cep}/json`);
  }
}
