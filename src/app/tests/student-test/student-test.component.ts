import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { MatRadioChange, MatHorizontalStepper, MatDialog, MatStepper } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentResultComponent } from '../student-result/student-result.component';
import { ResultService } from 'src/app/services/result.service';
import { TestQuestionModel } from 'src/app/models/testquestion.model';

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss']
})
export class StudentTestComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  // public test: TestModel = {} as TestModel;
  public result: ResultModel = {} as ResultModel;
  currentUser: UserModel;
  timer: number;
  percent;

  isLinear = false;
  sent = false;
  time;

  public choosenAnswers = {};

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private testService: TestService,
    private resultService: ResultService,
    private authService: AuthService,
    public dialog: MatDialog) {

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.resultService.getResult(params.userId, params.resultId).subscribe((result: ResultModel) => {
        this.result = result;
        console.log('result');
        console.log(this.result);

        this.time = setTimeout(() => this.save(), result.Test.time * 1000);
        this.result.percent = result.percent;

        this.result.Test.TestQuestions.forEach((testQuestions: TestQuestionModel) => {
          this.choosenAnswers[testQuestions.Question.id] = null;
        });
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

  save() {
    // console.log(stepper);

    // const results = [];
    // this.questions.forEach(question => {
    //   if (this.choosenAnswers[question.id]) {
    //     results.push({
    //       resultId: this.result.id,
    //       answerId: this.choosenAnswers[question.id].id
    //     });
    //   }
    // });

    const answerIds = Object.keys(this.choosenAnswers).map(key => this.choosenAnswers[key]).filter(item => item);

    this.resultService.sendResult(this.result.userId, this.result.id, answerIds).subscribe((result: ResultModel) => {
      console.log('Gyozelem!');
      this.sent = true;
      clearTimeout(this.time);
      this.time = 0;
      this.openTestResultDialog(result);
    });

    // console.log(stepper);
    // stepper.selectedIndex = this.testDTO.questions.length - 1;
    // stepper.next();
  }

  openTestResultDialog(result: ResultModel) {
    const dialogRef = this.dialog.open(StudentResultComponent, { data: result });

    dialogRef.afterClosed().subscribe(close => {
      console.log(`Dialog result: ${close}`);
    });
  }

}

