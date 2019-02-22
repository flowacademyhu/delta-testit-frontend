import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResultModel } from 'src/app/models/result.model';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss']
})
export class StudentResultComponent implements OnInit {

  public result: ResultModel = {} as ResultModel;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ResultModel,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StudentResultComponent>) {
      this.result = Object.assign({}, data);
    }

  ngOnInit() {
    console.log(this.result);
  }

}
