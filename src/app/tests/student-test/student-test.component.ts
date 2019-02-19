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
import { TimerDirective } from '../../directives/timer.directive';
import { ResultModel } from 'src/app/models/result.model';
import { MatRadioChange, MatHorizontalStepper, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentResultComponent } from '../student-result/student-result.component';

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss']
})
export class StudentTestComponent implements OnInit {
  public test: TestModel = {} as TestModel;
  currentUser: UserModel;
  timer: number;

  isLinear = false;
  sent = false;

  public choosenAnswers = {};

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
        { id: 1, questionId: 1, subjectId: 2, text: 'answer 5', isCorrect: null },
        { id: 2, questionId: 1, subjectId: 2, text: 'answer 6', isCorrect: null },
        { id: 3, questionId: 1, subjectId: 2, text: 'answer 7', isCorrect: null },
        { id: 4, questionId: 1, subjectId: 2, text: 'answer 8', isCorrect: null }
      ]
    },
    {
      id: 3, subjectId: 2, text: 'Question 3',
      picture: '', type: 'FREE',
      value: 12, status: Status.PUBLISHED,
      answers: [
        { id: 1, questionId: 1, subjectId: 2, text: 'answer 9', isCorrect: null },
        { id: 2, questionId: 1, subjectId: 2, text: 'answer 10', isCorrect: null },
        { id: 3, questionId: 1, subjectId: 2, text: 'answer 11', isCorrect: null },
        { id: 4, questionId: 1, subjectId: 2, text: 'answer 12', isCorrect: null }
      ]
    }
  ];

  testDTO: TestModel = <TestModel>{
    id: 1,
    name: 'Teszt',
    time: 1000,
    questions: this.questions
  };

  result: ResultModel = <ResultModel>{
    id: 123,
    status: 'PUBLISHED',
    testId: 1,
    userId: 8
  };


  constructor(private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private testService: TestService,
    private authService: AuthService,
    public dialog: MatDialog) {

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.testService.getTest(params.id).subscribe((result: TestModel) => {
        this.test = result;
      });
    });

    this.questions.forEach(question => {
      this.choosenAnswers[question.id] = null;
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

  save(stepper: MatHorizontalStepper) {
    console.log(stepper);

    const results = [];
    this.questions.forEach(question => {
      if (this.choosenAnswers[question.id]) {
        results.push({
          resultId: this.result.id,
          answerId: this.choosenAnswers[question.id].id
        });
      }
    });

    this.sent = true;
    console.log(stepper);

    this.openTestResultDialog();
    // stepper.selectedIndex = this.testDTO.questions.length - 1;
    // stepper.next();
  }

  openTestResultDialog() {
    const dialogRef = this.dialog.open(StudentResultComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

