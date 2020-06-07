export class Vacina {

 public id: number;
 public uuid: string;
 public vaccineUuid: string;
 public nome_vacina: string;
 public protecao_contra: string;
 public composicao: string;
 public n_doses: Array<Object>;
 public inicio_vacinacao: Array<Object>;
 public intervalo_doses: Array<Object>;
 public  dosagem: string;
 public via_administracao: string;
 public local_aplicacao: string;
 public agulha_recomendada: string;
 public tempo_validade_frasco_aberto: string;
 public eventos_adversos: string;
 public perfil: string;
 public dosages: Array<any>;

  public applicationLocationId: string;
  public basicVaccinationId: string;
  public compositionId: string;
  public description: string;
  public diseaseId: string;
  public dosageIds: Array<object>;
  public name: string;
  public needleId: string;
  public routeAdministrationId: string;
  public sideEffectId: string;
  public validityAfterOpenId: string;

}
