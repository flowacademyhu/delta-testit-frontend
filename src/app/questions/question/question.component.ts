import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { AnswerModel } from 'src/app/models/answer.model';
import { MatIconRegistry, MatSort } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: QuestionModel;

  @Input() answer: AnswerModel;

  @Output() questionDelete = new EventEmitter<QuestionModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource;
  displayedColumns: string[] = ['id', 'subject', 'text', 'type', 'value', 'status', 'edit'];

  constructor(
    private questionService: QuestionService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
    this.questionService.getAll().subscribe(questions => {
      this.dataSource = new MatTableDataSource<QuestionModel>(questions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.questionService.deleteQuestion(id).subscribe((result) => {
      this.questionDelete.next(this.question);
      this.loadData();
    }, error => console.log('Error', error));
  }

}
