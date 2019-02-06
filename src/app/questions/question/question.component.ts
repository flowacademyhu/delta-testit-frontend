import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { AnswerModel } from 'src/app/models/answer.model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Subject } from 'src/app/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: QuestionModel;

  @Input() answer: AnswerModel;

  @Input() type: Subject;

  @Output() questionDelete = new EventEmitter<QuestionModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource;
  displayedColumns: string[] = ['id', 'subject', 'text', 'type', 'value', 'status', 'edit'];

  constructor(private questionService: QuestionService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
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
    this.questionService.getAll().subscribe(questions => {
      this.dataSource = new MatTableDataSource<QuestionModel>(questions);
      this.dataSource.paginator = this.paginator;
    });
  }

  delete() {
    this.questionService.deleteQuestion(this.question.id).subscribe((result) => {
      this.questionDelete.next(this.question);
    }, error => console.log('Error', error));
  }

}
