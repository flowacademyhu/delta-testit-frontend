import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SubjectModel } from 'src/app/models/subject.model';
import { MatPaginator, MatSort, MatIconRegistry, MatTableDataSource } from '@angular/material';
import { SubjectService } from 'src/app/services/subject.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private subjectService: SubjectService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
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
    this.subjectService.getAll().subscribe(subjects => {
      this.dataSource = new MatTableDataSource<SubjectModel>(subjects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete() {
    this.subjectService.deleteSubject(this.subject.id).subscribe((result) => {
      this.subjectDelete.next(this.subject);
    }, error => console.log('Error', error));
  }

}
