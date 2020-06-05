import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  async crearUsuario() {

    if (this.registroForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });*/
    const {nombre, correo, password} = this.registroForm.value;

    let credenciales;
    try {
      credenciales = await this.authService.crearUsuario(nombre, correo, password);
    } catch (e) {
      this.store.dispatch(ui.stopLoading());
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message
      });
      return;
    }

    // Swal.close();
    this.store.dispatch(ui.stopLoading());
    await this.router.navigate(['/dashborad']);

  }

}
