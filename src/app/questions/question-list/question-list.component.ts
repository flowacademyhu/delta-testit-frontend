import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: QuestionModel[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
      console.log('Questions: ' + questions);
    });
  }

}
