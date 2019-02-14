import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';
import { MatIconRegistry, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';


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
  displayedColumns: string[] = [];

  currentUser: UserModel;

  // creatorId = this.currentUser.id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.testService.getAll().subscribe(tests => {
      console.log(tests);

      this.dataSource = new MatTableDataSource<TestModel>(this.filterTest(tests));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.tableDisplayColumn();
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

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMentor() {
    return this.currentUser && this.currentUser.role === Role.Mentor;
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }

  tableDisplayColumn() {
    if (this.isAdmin || this.isMentor) {
      this.displayedColumns.push('id', 'name', 'subject', 'student', 'mentor', 'status', 'result', 'start', 'edit');
    } else {
      this.displayedColumns.push('id', 'name', 'subject', 'mentor', 'status', 'result', 'start', 'edit');
    }
  }

  filterTest(tests: TestModel[]) {
    const filteredTests = [] as TestModel[];
    tests.map(test => {
      const filteredTest = {} as TestModel;

      filteredTest.subject = test.TestQuestions[0] ? test.TestQuestions[0].Question.Subject.name : '';
      filteredTest.id = test.id;
      filteredTest.name = test.name;
      filteredTest.userId = test.User ? test.User.name : '';
      filteredTest.status = test.status;
      filteredTests.push(filteredTest);
      console.log('Filtered test:' + filteredTest);
    });
    return filteredTests;
  }
}
