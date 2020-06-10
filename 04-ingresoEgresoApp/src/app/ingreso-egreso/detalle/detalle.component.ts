import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresoModel } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgresoModel[] = [];
  ingresosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.ingresosEgresos = items);
  }

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
  }

  borrar(uid: string) {
    console.log(uid);
  }

}
