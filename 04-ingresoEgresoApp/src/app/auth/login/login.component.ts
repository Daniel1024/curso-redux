import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    const {correo, password} = this.loginForm.value;

    let credenciales;
    try {
      credenciales = await this.authService.loginUsuario(correo, password);
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message
      });
      return;
    }

    Swal.close();
    this.router.navigate(['/dashborad']);
  }

}
