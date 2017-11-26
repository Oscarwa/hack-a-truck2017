import { Component, OnInit } from '@angular/core';
import { ParkService } from '../park.service';
import { TrailerService } from '../trailer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [480, 320];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Mes';
  showYAxisLabel = true;
  yAxisLabel = 'Uso';
  autoScale: boolean = true;
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  total: number;Population
  occupied: number;
  chart1: any[] = [];
  chart2: any[] = [];
  chart3: any[] = [];
  chart4: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor(
    private parkService: ParkService,
    private trailerService: TrailerService
  ) { }
  
  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {
    let $parks = this.parkService.getAll();
    $parks.subscribe(res => {
      this.total = res.length;
      this.occupied = res.filter((item, index) => !!item.id).length;
      this.chart1 = [
        {name: 'Capacidad', value: this.total},
        {name: 'Ocupados', value: this.occupied},
        {name: 'Libres', value: this.total - this.occupied}
      ];

      this.chart4 = [
        {name: 'Ocupacion', value: this.occupied}
      ]

      let rnd = Math.random();
      this.chart2 = [
        {name: 'Propios', value: Math.floor(this.occupied * rnd * 20)},
        {name: 'Externos', value: (Math.floor(this.occupied * rnd * 10)) },
        {name: 'Otros', value: Math.floor(this.occupied * rnd * 7)}
      ]; 
    });

    let $trailers = this.trailerService.getAll();
    $trailers.subscribe(res => {      
      this.chart3 = [
        {name: "Propios", series: [
          {name: 'Agosto', value: Math.floor(res.length * Math.random() * 20)},
          {name: 'Septiembre', value: (Math.floor(res.length * Math.random() * 10)) },
          {name: 'Octubre', value: Math.floor(res.length * Math.random() * 20)},          
          {name: 'Noviembre', value: Math.floor(res.length * Math.random() * 7)},
        ]},
        {name: "Externos", series: [
          {name: 'Agosto', value: Math.floor(res.length * Math.random() * 20)},
          {name: 'Septiembre', value: (Math.floor(res.length * Math.random() * 10)) },
          {name: 'Octubre', value: Math.floor(res.length * Math.random() * 20)},                    
          {name: 'Noviembre', value: Math.floor(res.length * Math.random() * 20)},
        ]},
        {name: "Otros", series: [
          {name: 'Agosto', value: (Math.floor(res.length * Math.random() * 10)) },
          {name: 'Septiembre', value: Math.floor(res.length * Math.random() * 20)},
          {name: 'Octubre', value: Math.floor(res.length * Math.random() * 20)},          
          {name: 'Noviembre', value: (Math.floor(res.length * Math.random() * 10)) },
        ]}
      ]
    });
  }

}
