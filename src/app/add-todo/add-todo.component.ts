
import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  newTodo: Todo = {
    title: '',
    description: '',
    completed: false,
    date: '',
  };

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.newTodo.title.trim() !== '') {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = { title: '', description: '', completed: false, date: ''}; // Reset the form
    }
  }
  
}
