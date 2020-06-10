import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs: Subscription

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  async guardar() {
    if (this.ingresoForm.invalid) return;

    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);

    try {
      await this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso);
      this.ingresoForm.reset();
      this.store.dispatch(stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    } catch (e) {
      this.store.dispatch(stopLoading());
      Swal.fire('Error', e.message, 'error');
    }
  }

}
