import {Component, OnChanges, OnInit} from '@angular/core';
import {VacinaService} from '../services/vacina.service';
import {ListarVacina} from '../shared/listar-vacina';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastrar-vacina',
  templateUrl: './cadastrar-vacina.component.html',
  styleUrls: ['./cadastrar-vacina.component.css']
})
export class CadastrarVacinaComponent implements OnInit {

  public applicationLocationId: Array<string>;
  public basicVaccinationId: Array<string>;
  public compositionId: Array<string>;
  public diseaseId: Array<string>;
  public dosageIds: Array<string>;
  public needleId: Array<string>;
  public routeAdministrationId: Array<string>;
  public sideEffectId: Array<string>;
  public validityAfterOpenId: Array<string>;
  public formVacina: FormGroup;
  public name: string;
  public description: string;
  private ids;

  constructor(private formBuilder: FormBuilder,
              private vacinaService: VacinaService) { }

  ngOnInit(): void {
    this.formulario();
    this.listar();

  }
  formulario() {
    this.formVacina = this.formBuilder.group({
      applicationLocationId: ['', Validators.required],
      basicVaccinationId: ['', Validators.required],
      compositionId: ['', Validators.required],
      description: ['', Validators.required],
      diseaseId: ['', Validators.required],
      name: ['', Validators.required],
      needleId: ['', Validators.required],
      routeAdministrationId: ['', Validators.required],
      sideEffectId: ['', Validators.required],
      validityAfterOpenId: ['', Validators.required],
      dosageIds : this.formBuilder.array(
        [
          this.ids
        ])
    });
  }
  listar() {
    this.vacinaService.getApplicationLocation().subscribe(applicationLocation => {
        this.applicationLocationId = applicationLocation;
    }, error => console.log('Erro ao listar applicationLocation', error));

    this.vacinaService.getBasicVaccina().subscribe(basicVaccination => {
        this.basicVaccinationId = basicVaccination;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.getComposition().subscribe(composition => {
        this.compositionId = composition;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.getDisease().subscribe(disease => {
        this.diseaseId = disease;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.getDosage().subscribe(dosage => {
      console.log('vacinas', dosage);
        this.dosageIds = dosage;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.getNeedle().subscribe(needle => {
        this.needleId = needle;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.geValidityAfterOpen().subscribe(validityAfterOpen => {
        this.validityAfterOpenId = validityAfterOpen;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.getSideEffect().subscribe(sideEffect => {
        this.sideEffectId = sideEffect;
    }, error => console.log('Erro ao listar basicVaccination', error));

    this.vacinaService.getRouteAdministration().subscribe(routeAdministration => {
        this.routeAdministrationId = routeAdministration;
    }, error => console.log('Erro ao listar basicVaccination', error));
  }

  cadastrarVacina() {

    if (this.formVacina.valid) {
    console.log(JSON.stringify(this.formVacina.value));
      this.vacinaService.cadastrarVacina(this.formVacina.value).subscribe(vacina => {
        this.formVacina.reset();
      }, error => console.log('Ocorreu um erro ao cadastrar vacina', error));
    }
  }

  valorId(uuid: string) {
   this.ids = uuid;
   this.formulario();
   console.log(this.formVacina.value);
  }
}
