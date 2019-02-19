import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss']
})
export class StudentResultComponent implements OnInit {

  constructor( public dialog: MatDialog,
    public dialogRef: MatDialogRef<StudentResultComponent>) {
    }

  ngOnInit() {
  }

}
