import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject.model';
import { MatPaginator, MatSort, MatIconRegistry, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { SubjectService } from 'src/app/services/subject.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/table';
import { SubjectEditCreateComponent } from '../subject-edit-create/subject-edit-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  @Input() subject: SubjectModel;

  @Output() subjectDelete = new EventEmitter<SubjectModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource;

  displayedColumns: string[] = ['id', 'name', 'edit'];

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog
    ) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/delete_icon.svg')
    );

  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.subjectService.getAll().subscribe(subjects => {
      this.dataSource = new MatTableDataSource<SubjectModel>(subjects) || null;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('D' + this.dataSource);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.subjectService.deleteSubject(id).subscribe((result) => {
      this.subjectDelete.next(this.subject);
      this.loadData();
    }, error => console.log('Error', error));
  }

  openSubjectDialog() {
    const dialogRef = this.dialog.open(SubjectEditCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.subjectService.createSubject(this.subject).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['subjects/list']);
      }, (error) => {
        console.log('Error', error);
      });
      console.log(`Dialog result: ${result}`);
    });
  }
}
