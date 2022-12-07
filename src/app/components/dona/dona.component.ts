import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{
  @Input()  public colors: string[] =  ['#6857E6','#009FEE','#FF222'];
  @Input()  public dataNumber: number[] =  [ 333, 333, 100 ];
  @Input()  public titulo: string =  '';
  @Input()  public labels1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input()  public type: ChartType = 'doughnut';

  public doughnutChartType!: ChartType;
  public doughnutChartData!: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.doughnutChartType = this.type;

    this.doughnutChartData = {
      labels: this.labels1,
      datasets: [
        { 
          data: this.dataNumber,
          backgroundColor: this.colors
        },
      ]
    };
  }




 


}
