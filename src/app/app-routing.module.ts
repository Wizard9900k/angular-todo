// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'notes', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
