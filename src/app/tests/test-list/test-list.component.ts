import { Component, OnInit } from '@angular/core';
import { TestModel } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {

  tests: TestModel[] = [];
  public questions: QuestionModel[] = [];

  constructor(private testService: TestService, private questionService: QuestionService) { }

  ngOnInit() {
    this.testService.getAll().subscribe(tests => {
      this.tests = tests;
      console.log('Tests: ' + tests);
    });

    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
    });
  }

}
