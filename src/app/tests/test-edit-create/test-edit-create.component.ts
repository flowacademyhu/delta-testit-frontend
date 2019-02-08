import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-test-edit-create',
  templateUrl: './test-edit-create.component.html',
  styleUrls: ['./test-edit-create.component.scss']
})

export class TestEditCreateComponent implements OnInit {

  public test: TestModel = {} as TestModel;
  @Input() question: QuestionModel = {} as QuestionModel;
  public dataSource;
  public selection;
  displayedColumns: string[] = ['select', 'id', 'text'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private questionService: QuestionService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {

    this.questionService.getAll().subscribe(questions => {
      this.dataSource = new MatTableDataSource<QuestionModel>(questions);
      this.selection = new SelectionModel<QuestionModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });

    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.testService.getTest(params.id).subscribe((result: TestModel) => {
          this.test = result ? result : {} as TestModel;
        });
      }
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
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'test-edit-create-dialog-component',
  templateUrl: 'test-edit-create-dialog-component.html'
})

export class DialogContent {}
