import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Vacina} from '../shared/vacina.model';
import {URL_API_VACINA} from '../../app.api';

@Injectable({
  providedIn: 'root'
})

export class VacinaService {
  constructor(private http: HttpClient) {}

  public getVacinas(): Observable<Vacina[]> {
    console.log(this.http.get<Vacina[]>(`${URL_API_VACINA}`));
    return this.http.get<Vacina[]>(`${URL_API_VACINA}`);
  }
  public getVacinasNome(nome: string): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${URL_API_VACINA}?nome_vacina=${nome}`);
  }
}
