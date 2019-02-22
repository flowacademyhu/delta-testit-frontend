import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ResultModel } from 'src/app/models/result.model';
import { MatPaginator, MatSort, MatIconRegistry, MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ResultService } from 'src/app/services/result.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { TestModel } from 'src/app/models/test.model';
import { ResultCreateEditComponent } from '../result-create-edit/result-create-edit.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TestService } from 'src/app/services/test.service';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResultComponent implements OnInit {

  @Input() result: ResultModel;
  @Input() testChanged: Subject<boolean> = new Subject;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource;

  public tests: TestModel[] = [] as TestModel[];

  currentUser: UserModel;

  displayedColumns: string[] = ['id', 'testname', 'student', 'status', 'result', 'start', 'edit'];
  resultClosed = 'CLOSED';

  constructor(
    private resultService: ResultService,
    private authService: AuthService,
    public dialog: MatDialog,
    private testService: TestService
    ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.testChanged.subscribe((changed) => {
      console.log('Test changed: ' + changed);
      this.loadData();
    });
    this.loadData();
  }

  private loadData() {
    forkJoin(
      this.resultService.getAll(),
      this.testService.getAll()
    ).subscribe(([results, tests]) => {
      this.dataSource = new MatTableDataSource<ResultModel>(this.resultFilter(results)) || null;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.tests = this.isStudent ? tests.filter(test => test.User.id === this.currentUser.id) : tests;
    });
  }

  resultFilter(results: ResultModel[]) {
    return this.isStudent ? results.filter(element => element.userId === this.currentUser.id) : results;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTestsResults(test: TestModel): ResultModel[] {
    return this.dataSource.data.filter(result => result.Test.id === test.id);
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

  get isRow() {
    return this.result.userId === this.currentUser.id;
  }

  openTestDialog(test: TestModel) {
    const dialogRef = this.dialog.open(ResultCreateEditComponent, { data: test });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
      console.log(`Dialog result: ${result}`);
    });
  }
}
