import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { ResultCreateEditComponent } from '../result-create-edit/result-create-edit.component';
import { Role } from 'src/app/models/role';
import { ResultModel } from 'src/app/models/result.model';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { TestService } from 'src/app/services/test.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ResultService } from 'src/app/services/result.service';
import { UserModel } from 'src/app/models/user.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @Input() result: ResultModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource;

  public tests: TestModel[] = [] as TestModel[];

  currentUser: UserModel;

  displayedColumns: string[] = ['id', 'testname', 'student', 'creator', 'status', 'result', 'start', 'edit'];
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
