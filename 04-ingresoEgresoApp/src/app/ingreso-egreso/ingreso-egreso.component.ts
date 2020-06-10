import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
  }

  async guardar() {
    if (this.ingresoForm.invalid) return;

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);

    try {
      await this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso);
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
    } catch (e) {
      Swal.fire('Error', e.message, 'error');
    }
  }

}
