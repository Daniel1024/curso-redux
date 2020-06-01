import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TodoModels } from '../models/todo.models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoModels;
  @ViewChild('inputFisico') txtInputFisico: ElementRef

  chkCompleatado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.chkCompleatado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
  }

}
