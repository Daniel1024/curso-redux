import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async crearUsuario() {

    if (this.registroForm.invalid) {
      return;
    }
    const {nombre, correo, password} = this.registroForm.value;

    let credenciales;
    try {
      credenciales = await this.authService.crearUsuario(nombre, correo, password);
    } catch (e) {
      console.error(e);
      return;
    }

    // @ts-ignore
    this.router.navigated(['/dashborad']);

  }

}
