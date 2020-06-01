import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: []
})
export class HijoComponent implements OnInit {

  contador: number;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.select('contador')
      .subscribe(contador => this.contador = contador);
  }

  multiplicar() {
    const numero = 2;
    this.store.dispatch(actions.multiplicar({numero}));
  }

  dividir() {
    const numero = 2;
    this.store.dispatch(actions.dividir({numero}));
  }

}
