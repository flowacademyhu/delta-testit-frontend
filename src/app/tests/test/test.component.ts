import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';
import { MatIconRegistry, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { ResultCreateEditComponent } from 'src/app/results/result-create-edit/result-create-edit.component';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TestComponent implements OnInit {

  @Input() test: TestModel;

  @Output() testDelete = new EventEmitter<TestModel>();
  @Output() testSent = new EventEmitter<boolean>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatSort) sort;

  public dataSource;
  columnsToDisplay: string[] = ['id', 'name', 'subject', 'creator', 'edit'];

  currentUser: UserModel;
  expandedElement: TestModel;

  // creatorId = this.currentUser.id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.testService.getAll().subscribe(tests => {
      console.log(tests);

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

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMentor() {
    return this.currentUser && this.currentUser.role === Role.Mentor;
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }

  openTestDialog(test: TestModel) {
    const dialogRef = this.dialog.open(ResultCreateEditComponent, { data: test });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
      this.testSent.emit(true);
      console.log(`Dialog result: ${result}`);
    });
  }

}
