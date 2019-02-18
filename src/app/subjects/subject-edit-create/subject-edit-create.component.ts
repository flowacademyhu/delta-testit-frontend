import { Component, OnInit, Optional, Inject } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-subject-edit-create',
  templateUrl: './subject-edit-create.component.html',
  styleUrls: ['./subject-edit-create.component.scss']
})
export class SubjectEditCreateComponent implements OnInit {

  public subject: SubjectModel = {} as SubjectModel;
  public createdSubject: SubjectModel[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SubjectModel,
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubjectEditCreateComponent>) {
      this.subject = Object.assign({}, data);
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.subjectService.getSubject(params.id).subscribe((result: SubjectModel) => {
          this.subject = result ? result : {} as SubjectModel;
        });
      }
    });
  }

  save() {
    if (!this.isCreateMode()) {
      this.subjectService.editSubject(this.subject).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['subjects/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.subjectService.createSubject(this.subject).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['subjects/list']);
      }, (error) => {
        console.log('Error', error);
      });
    }
  }

  delete() {
    this.subjectService.deleteSubject(this.subject.id).subscribe((result) => {
      this.router.navigate(['subjects/list']);
    }, error => console.log('Error', error));
  }

  isCreateMode(): boolean {
    return !this.subject.id;
  }

}
