import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';
import { MatIconRegistry, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() test: TestModel;

  @Output() testDelete = new EventEmitter<TestModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource;
  displayedColumns: string[] = ['id', 'name', 'subject', 'mentor', 'status', 'result', 'edit'];


  constructor(
    private testService: TestService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );
  }

  ngOnInit() {
    this.testService.getAll().subscribe(tests => {
      this.dataSource = new MatTableDataSource<TestModel>(tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete() {
    this.testService.deleteTest(this.test.id).subscribe((result) => {
      this.testDelete.next(this.test);
    }, error => console.log('Error', error));
  }

}
