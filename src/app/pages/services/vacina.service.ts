import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Vacina} from '../shared/vacina.model';
import {URL_API_VACIN} from '../../app.api';
import {URL_API_VACINA} from '../../app.api';

@Injectable({
  providedIn: 'root'
})

export class VacinaService {
  constructor(private http: HttpClient) {}

  public getVacinas(): Observable<Vacina[]> {
    console.log(this.http.get<Vacina[]>(`${URL_API_VACIN}`));
    return this.http.get<Vacina[]>(`${URL_API_VACIN}`);
  }
  public getVacinasNome(nome: string): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${URL_API_VACIN}?nome_vacina=${nome}`);
  }
  public getApplicationLocation(): Observable<any> {
      return this.http.get(`${URL_API_VACINA}application-location`);
  }
  public geValidityAfterOpen(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}validity-after-open`);
  }
  public getSideEffect(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}side-effect`);
  }
  public getRouteAdministration(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}route-administration`);
  }
  public getNeedle(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}needle`);
  }
  public getDosage(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}dosage`);
  }
  public getDisease(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}disease`);
  }
  public getComposition(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}composition`);
  }
  public getBasicVaccina(): Observable<any> {
      return this.http.get(`${URL_API_VACINA}basic-vaccination`);
  }
  public cadastrarVacina(vacina: Object[]): Observable<any> {
    console.log('vacina', vacina);
      return this.http.post(`${URL_API_VACINA}vaccine`, vacina);
  }
}
