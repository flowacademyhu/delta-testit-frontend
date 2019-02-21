import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatDialogRef } from '@angular/material';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { SelectionModel } from '@angular/cdk/collections';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectModel } from 'src/app/models/subject.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-test-edit-create',
  templateUrl: './test-edit-create.component.html',
  styleUrls: ['./test-edit-create.component.scss']
})

export class TestEditCreateComponent implements OnInit {

  @Input() question: QuestionModel = {} as QuestionModel;

  public test: TestModel = {} as TestModel;
  public questions: QuestionModel[] = [];

  public dataSource;
  public selection;

  currentUser: UserModel;
  // creatorId = this.currentUser.id;

  displayedColumns: string[] = ['select', 'id', 'text'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private questionService: QuestionService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.test.userId = this.currentUser.id;

    this.questionService.getAll().subscribe(questions => {
      this.dataSource = new MatTableDataSource<QuestionModel>(questions);
      this.selection = new SelectionModel<QuestionModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });

    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.testService.getTest(params.id).subscribe((result: TestModel) => {
          this.test = result ? result : {} as TestModel;
          this.test.time = this.test.time / 60;
        });
      }
    });

    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
    });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  save() {
    this.test.time = this.test.time * 60;
    if (!this.isCreateMode()) {
      this.testService.editTest(this.test).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['tests/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.testService.createTest(this.test).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['tests/list']);
      }, (error) => {
        console.log('Error', error);
      });
    }
  }

  delete() {
    this.testService.deleteTest(this.test.id).subscribe((result) => {
      this.router.navigate(['tests/list']);
    }, error => console.log('Error', error));
  }

  isCreateMode(): boolean {
    return !this.test.id;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.test.questions = result.map(question => question.id);
      }
      console.log(`Dialog result: ${result}`);
    });
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

}

@Component({
  selector: 'app-test-edit-create-dialog-component',
  templateUrl: 'test-edit-create-dialog-component.html',
  styleUrls: ['./test-edit-create.component.scss']
})

export class DialogContentComponent implements OnInit {

  public questions: QuestionModel[] = [];
  public selectedQuestions: QuestionModel[] = [];
  public subjects: SubjectModel[] = [];

  public selectedSubjectId: number;

  constructor(
    public dialog: MatDialog,
    private questionService: QuestionService,
    private subjectService: SubjectService,
    public dialogRef: MatDialogRef<DialogContentComponent>
  ) {
  }

  ngOnInit() {
    forkJoin(
      this.questionService.getAll(),
      this.subjectService.getAll()
    ).subscribe(([questions, subjects]) => {
      this.questions = questions;
      this.subjects = subjects;
    });
  }

  checkValue(event: any) {
    console.log(event.source.value);
    this.selectedQuestions.push(event.source.value);
    console.log(this.selectedQuestions);

  }

}
