import { Component, OnInit } from '@angular/core';
import { TodoModels } from '../models/todo.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: TodoModels[] = [];

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.select('todos')
      .subscribe(todos => this.todos = todos);
  }

}
