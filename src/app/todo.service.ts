
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.todos);

  constructor() {}

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.todosSubject.next(this.todos);
  }
}
