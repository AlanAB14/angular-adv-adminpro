import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  colors: string[] = ['#6857E6','#FF8576','#6852FF'];
  titulo: string = 'Alan';
  data: number[] = [333, 300, 100];
  labels1: string[] = ['Campo Uno', 'Campo Dos', 'Campo Tres'];



}
