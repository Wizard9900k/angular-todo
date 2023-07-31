import { Component,OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


interface Note {
  title: string;
  content: string;
  selected: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  currentNote: Note 
  | undefined;

  old_note: any;

  constructor(private notesService: NotesService, private dialog: MatDialog) {}

  ngOnInit() {

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
    content: '',
    selected: '',
  }

  addNote() {
    this.notesService.addNote(this.newNote);
    this.selectNote(this.newNote)
    this.newNote = { title: 'Untitled', content: '', selected: ''}
  }




  selectNote(note: Note) {
    if (this.old_note) {
      this.old_note.selected= "none";
      console.log(this.old_note.selected)
    }
    note.selected = "yellow";
    console.log(note.selected)
    this.old_note = note
    this.currentNote = note;
  
  }



  addNewNote(): void {
    this.notes.push({ title: 'Untitled', content: '', selected: ''});
    this.selectNote(this.notes[this.notes.length - 1]);
  }

  
  deletedNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index > -1) {
      this.notes.splice(index, 1);
      if (this.notes.length > 0) {
        this.selectNote(this.notes[0]);
      } else {
        this.currentNote = { title: '', content: '', selected: ''};
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

}
