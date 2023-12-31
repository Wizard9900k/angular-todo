
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker'; 


interface Todo {
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

interface Completed {
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

type NewType = string;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  markedAsDone: boolean = false;
  var: boolean = true;
  completedItems: Completed[] = [];
  today = new Date();
  bool_today: boolean = true;
  sorted: boolean = true;
  onOrOff: string = "warn";

  constructor(private todoService: TodoService, private dialog: MatDialog)
   {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      if (this.sorted) {
        this.sortTodosByDueDate()
      }
      
      this.adjustDate(this.todos)
    });

    for (let i = 0; i < this.todos.length; i++) {
      console.log(this.todos[i].date)
      if (this.todos[i].completed == true) {
        this.completedItems.push(this.todos[i]);
      }
    
    }
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  deleteCompleted(todo: Todo) {
    const index = this.completedItems.indexOf(todo);
    if (index !== -1) {
      this.completedItems.splice(index, 1);
    }
  }

  isCompleted(todo: Todo) {  
    this.completedItems.push(todo)
    this.deleteTodo(todo);
  }

  isNotCompleted(todo: Todo) {
    this.todoService.addTodo(todo);
    this.deleteCompleted(todo);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddTodoDialogComponent);
  
    dialogRef.backdropClick().subscribe(() => {
      
      dialogRef.close();
    })
  
  }
  

  newTodo: Todo = {
    title: '',
    description: '',
    completed: false,
    date: ''

  };


  addTodo() {
    if (this.newTodo.title.trim() !== '') {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = { title: '', description: '', completed: false, date: '' };
      

    }
  }

  deleteAllCompleted() {
    this.completedItems = []
  }


  sortTodosByDueDate() {
    this.todos.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  changedDate: string | undefined;
  pipe = new DatePipe('en-US');
  changeFormat(){
    let ChangedFormat = this.pipe.transform(this.today, 'YYYY-MM-dd');
    this.changedDate = ChangedFormat as string;
    console.log(this.changedDate);
  }

  adjustDate (date: any): "today" | string {
    if (date.date == this.changeFormat()) {
      return "today";
    }
    else {
      return date;
    }
  }

 changeSort() {
  this.sorted = !this.sorted;
  if (this.sorted) {
    this.sortTodosByDueDate()
    this.onOrOff = "warn";
  }
  else {
    this.onOrOff = "grey";
  }
  console.log(this.sorted);
 }

 drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  this.sorted = false;
  this.onOrOff = "grey";
}
}

