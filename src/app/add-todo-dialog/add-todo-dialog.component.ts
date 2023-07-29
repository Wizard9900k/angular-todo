import { STRING_TYPE } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TodoService } from '../todo.service';

export interface DialogData {
  animal: string;
  name: string;
}

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
})
export class AddTodoDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private todoService: TodoService
  ) {}

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
      this.dialogRef.close();
    }
  }

  
}

