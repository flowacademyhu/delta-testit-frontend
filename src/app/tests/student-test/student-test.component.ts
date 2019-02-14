import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { TestModel } from 'src/app/models/test.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { ResourceLoader } from '@angular/compiler';
import { QuestionModel, Status } from 'src/app/models/question.model';
import { AnswerModel } from 'src/app/models/answer.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss']
})
export class StudentTestComponent implements OnInit {
  public test: TestModel = {} as TestModel;
  currentUser: UserModel;

  isLinear = false;

  questions: QuestionModel[] = [
    {
      id: 1, subjectId: 2, text: 'Question 1',
      picture: '', type: 'FREE',
      value: 12, status: Status.PUBLISHED,
      answers: [
        { id: 1, questionId: 1, subjectId: 2, text: 'answer 1', isCorrect: null },
        { id: 2, questionId: 1, subjectId: 2, text: 'answer 2', isCorrect: null },
        { id: 3, questionId: 1, subjectId: 2, text: 'answer 3', isCorrect: null },
        { id: 4, questionId: 1, subjectId: 2, text: 'answer 4', isCorrect: null }
      ]
    },
    {
      id: 2, subjectId: 2, text: 'Question 2',
      picture: '', type: 'FREE',
      value: 12, status: Status.PUBLISHED,
      answers: [
        { id: 1, questionId: 1, subjectId: 2, text: 'answer 1', isCorrect: null },
        { id: 2, questionId: 1, subjectId: 2, text: 'answer 2', isCorrect: null },
        { id: 3, questionId: 1, subjectId: 2, text: 'answer 3', isCorrect: null },
        { id: 4, questionId: 1, subjectId: 2, text: 'answer 4', isCorrect: null }
      ]
    },
    {
      id: 3, subjectId: 2, text: 'Question 3',
      picture: '', type: 'FREE',
      value: 12, status: Status.PUBLISHED,
      answers: [
        { id: 1, questionId: 1, subjectId: 2, text: 'answer 1', isCorrect: null },
        { id: 2, questionId: 1, subjectId: 2, text: 'answer 2', isCorrect: null },
        { id: 3, questionId: 1, subjectId: 2, text: 'answer 3', isCorrect: null },
        { id: 4, questionId: 1, subjectId: 2, text: 'answer 4', isCorrect: null }
      ]
    }
  ];

  testDTO: TestModel = <TestModel>{
      id: 1,
      name: 'Teszt',
      time: 60,
      questions: this.questions
    };


  constructor(private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private testService: TestService,
    private authService: AuthService) {

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.testService.getTest(params.id).subscribe((result: TestModel) => {
        this.test = result;
      });
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

  // filterTest(test: TestModel[]) {
  //   let filteredTests = [];
  //   test.map(result => {
  //     let filteredTest = {};

  //     filteredTest.name = result.name;
  //     filteredTest.userId = result.User.name;
  //     filteredTests.push(filteredTest);
  //     console.log(filteredTest);
  //   });
  //   return filteredTests;
  // }

}
