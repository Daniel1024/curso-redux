import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ingresosEgresosSubs: Subscription;

  // Doughnut
  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: MultiDataSet = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.generarEstadistica(items));
  }

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
  }

  generarEstadistica(items: IngresoEgresoModel[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      const monto = parseInt(item.monto);
      if (item.tipo === 'ingreso') {
        this.totalIngresos += monto;
        this.ingresos++;
      } else {
        this.totalEgresos += monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
