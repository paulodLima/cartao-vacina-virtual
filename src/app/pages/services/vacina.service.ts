import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Vacina} from '../shared/vacina.model';
import {URL_API_VACCINECARD, URL_API_VACINA} from '../../app.api';

@Injectable({
  providedIn: 'root'
})

export class VacinaService {
  private historico: Object = new Object;

  constructor(private http: HttpClient) {
  }

  public getVacinas(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${URL_API_VACINA}/v1/api/vaccine`);
  }

  public getVacinaUuid(uuid: string): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${URL_API_VACINA}/v1/api/vaccine/${uuid}`);
  }

  public getVacinasNome(uuid: string): Observable<Vacina> {
    return this.http.get<Vacina>(`${URL_API_VACINA}/v1/api/vaccine/${uuid}`);
  }

  public getApplicationLocation(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/application-location`);
  }

  public geValidityAfterOpen(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/validity-after-open`);
  }

  public getSideEffect(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/side-effect`);
  }

  public getRouteAdministration(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/route-administration`);
  }

  public getNeedle(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/needle`);
  }

  public getDosage(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/dosage`);
  }

  public getDisease(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/disease`);
  }

  public getComposition(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/composition`);
  }

  public getBasicVaccina(): Observable<any> {
    return this.http.get(`${URL_API_VACINA}/v1/api/basic-vaccination`);
  }

  public cadastrarVacina(vacina: Object[]): Observable<any> {
    return this.http.post(`${URL_API_VACINA}/v1/api/vaccine`, vacina);
  }

  public updateDeCalendario(vacina, uuid): Observable<any> {
    console.log('vacina api', vacina);
    return this.http.put(`${URL_API_VACCINECARD}/calendar/${uuid}`, vacina);
  }

  public geCalendarioPessoa(pessoa: string): Observable<any> {
    return this.http.get(`${URL_API_VACCINECARD}/calendar?personUuid=${pessoa}`);
  }

  public async getHistoricoVacina(pessoa: string): Promise<any> {
    const object = await this.http.get(`${URL_API_VACCINECARD}/vaccination-information?personUuid=${pessoa}`).toPromise();
    return object;
  }

  public getHistoricoVacinaFiltroObgTmd(pessoa: string, tomada: boolean, obrigatoria: boolean): Observable<any> {
    return this.http.get(`${URL_API_VACCINECARD}/vaccination-information?personUuid=${pessoa}&required=${obrigatoria}&applied=${tomada}`);
  }

  public buscarHistoricoNaoObgTmd(pessoa: string, tomada: boolean, obrigatoria: boolean): Observable<any> {
    return this.http.get(`${URL_API_VACCINECARD}/vaccination-information?personUuid=${pessoa}&required=${obrigatoria}&applied=${tomada}`);
  }

  public buscarHistoricoObg(pessoa: string, tomada: boolean, obrigatoria: boolean): Observable<any> {
    return this.http.get(`${URL_API_VACCINECARD}/vaccination-information?personUuid=${pessoa}&required=${obrigatoria}&applied=${tomada}`);
  }

  public buscarHistoricoObgTmd(pessoa: string, tomada: boolean, obrigatoria: boolean): Observable<any> {
    return this.http.get(`${URL_API_VACCINECARD}/vaccination-information?personUuid=${pessoa}&required=${obrigatoria}&applied=${tomada}`);
  }

  criarLocal(local: any): Observable<any> {
    return this.http.post(`${URL_API_VACCINECARD}/health-center`, local);
  }

  getLocais() {
    return this.http.get(`${URL_API_VACCINECARD}/health-center?page=1&size=10&sort=name,ASC`);

  }

  deleteLocal() {
    return this.http.delete(`${URL_API_VACCINECARD}/health-center?page=1&size=10&sort=name,ASC`);

  }
  getLocaisPag2() {
    return this.http.get(`${URL_API_VACCINECARD}/health-center?page=2&size=10&sort=name,ASC`);
  }
  getLocaisPag3() {
    return this.http.get(`${URL_API_VACCINECARD}/health-center?page=3&size=10&sort=name,ASC`);
  }

  apagarLocal(uuid) {
    return this.http.delete(`${URL_API_VACCINECARD}/health-center/${uuid}`);
  }

  getLocalUuid(uuid) {
    console.log('uuid get', uuid);
    return this.http.get(`${URL_API_VACCINECARD}/health-center/${uuid}`);
  }

  AtualizarLocalUuid(uuid, local) {
    return this.http.put(`${URL_API_VACCINECARD}/health-center/${uuid}`, local);
  }

  atualizarDosagem(uuid: string, dosage: any): Observable<any> {
    return this.http.put(`${URL_API_VACCINECARD}/dosage-information/${uuid}`, dosage);
  }

  emailVacinasPendentes(): Observable<any> {
    return this.http.post(`${URL_API_VACCINECARD}/mail/delayed-vaccines`, null);
  }
}
