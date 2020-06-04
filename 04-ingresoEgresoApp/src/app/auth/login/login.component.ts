import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

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
    const {correo, password} = this.loginForm.value;

    let credenciales;
    try {
      credenciales = await this.authService.loginUsuario(correo, password);
    } catch (e) {
      console.error(e);
      return;
    }

    console.log(credenciales);
    // @ts-ignore
    // this.router.navigated(['/dashborad']);
  }

}
