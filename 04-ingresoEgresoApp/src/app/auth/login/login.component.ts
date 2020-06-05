import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['d.lopez.1740@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  async loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });*/
    const {correo, password} = this.loginForm.value;

    let credenciales;
    try {
      credenciales = await this.authService.loginUsuario(correo, password);
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
