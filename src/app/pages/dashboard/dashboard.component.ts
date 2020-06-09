import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {PessoasService} from '../services/pessoas.service';
import {Pessoa} from '../shared/pessoa';
import {VacinaService} from '../services/vacina.service';
import {Vacina} from '../shared/vacina.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  private pessoas: Pessoa[];
  public nmrPessoa = 0;
  public nmrVacinas = 0;
  private vacinas: Vacina[];

  constructor(private pessoaService: PessoasService,
              private vacinaService: VacinaService) { }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    const ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    const chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

    this.listarPessoas();
    this.listarVacinas();
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  listarPessoas() {
    this.pessoaService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
      this.nmrPessoa = this.pessoas.length;
    }, erro => {
      console.log('Erro ao listar pessoas', erro);
    });
  }

  listarVacinas() {
    this.vacinaService.getVacinas().subscribe(vacinas => {
      this.vacinas = vacinas;
      this.nmrVacinas = this.vacinas.length;
    }, error => console.log('erro ao listar vacinas', error));
  }
}
