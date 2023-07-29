import { Component,OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { MatDialog } from '@angular/material/dialog';

interface Note {
  title: string;
  content: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  currentNote: Note //= {title: 'no note selected', content: ''};
  | undefined;

  constructor(private notesService: NotesService, private dialog: MatDialog) {}

  ngOnInit() {
    // Select the first note by default (optional)

    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });

  }
 

  deleteNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  newNote: Note = {
    title: 'Untitled',
    content: ''
  }

  addNote() {
    this.notesService.addNote(this.newNote);
    this.selectNote(this.newNote)
    this.newNote = { title: 'Untitled', content: ''}
  }




  selectNote(note: Note) {
    this.currentNote = note;
  }



  addNewNote(): void {
    this.notes.push({ title: 'New Note', content: ''});
    this.selectNote(this.notes[this.notes.length - 1]);
  }

  
  deletedNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index > -1) {
      this.notes.splice(index, 1);
      if (this.notes.length > 0) {
        this.selectNote(this.notes[0]);
      } else {
        this.currentNote = { title: '', content: ''};
      }
    }
  }

}
