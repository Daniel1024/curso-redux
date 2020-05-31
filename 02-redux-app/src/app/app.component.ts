import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  contador: number;

  constructor() {
    this.contador = 10;
  }

  incrementar() {
    this.contador++;
  }

  decrementar() {
    this.contador--;
  }
}
