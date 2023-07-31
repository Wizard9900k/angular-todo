import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Note {
  title: string;
  content: string;
  selected: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(this.notes);

  constructor() {}

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Note): void {
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }
}
