import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SubjectModel } from 'src/app/models/subject.model';
import { AnswerService } from 'src/app/services/answer.service';
import { AnswerModel } from 'src/app/models/answer.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-question-edit-create',
  templateUrl: './question-edit-create.component.html',
  styleUrls: ['./question-edit-create.component.scss']
})
export class QuestionEditCreateComponent implements OnInit {

  public question: QuestionModel = {} as QuestionModel;

  public subject: SubjectModel = {} as SubjectModel;

  public answer1: AnswerModel = {} as AnswerModel;
  public answer2: AnswerModel = {} as AnswerModel;
  public answer3: AnswerModel = {} as AnswerModel;
  
  public answerModelArray: AnswerModel[] = [];

  // formArray = new FormArray([new FormControl('SF')]);
  // this.myGroup = new FormGroup({
    //   AnswerModel: this.formArray
    // });
    
    // get aliases() {
      //   return this.formArray.get('aliases') as FormArray;
      // }
      
  formAnswer = new FormGroup({
    answers: new FormArray([])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (!params.id) return
      this.questionService.getQuestion(params.id).subscribe((result: QuestionModel) => {
        this.question = result ? result : {} as QuestionModel;
      });
    });
  }

  checkValue1(event: any) {
    this.answer1.isCorrect = event.checked;
    console.log('isCorrect: ' + this.answer1.isCorrect);
    console.log(event.checked);
  }

  checkValue2(event: any) {
    this.answer2.isCorrect = event.checked;
    console.log('isCorrect: ' + this.answer2.isCorrect);
    console.log(event.checked);
  }

  checkValue3(event: any) {
    this.answer3.isCorrect = event.checked;
    console.log('isCorrect: ' + this.answer3.isCorrect);
    console.log(event.checked);
  }

  onAddNewAnswer(answer: AnswerModel) {
    this.answers.push(new FormControl(answer));
  }

  onAddNewAnswerIsCorrect(answer: AnswerModel) {
    this.answers.push(new FormControl(answer.isCorrect));
  }

  get answers() {
    return this.formAnswer.get('answers') as FormArray;
  }

  save() {
    if (!this.isCreateMode()) {
      this.questionService.editQuestion(this.question).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['questions/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.questionService.createQuestion(this.question).subscribe((result) => {
        this.answer1.questionId = result.id;
        this.answer2.questionId = result.id;
        this.answer3.questionId = result.id;
        this.answerService.createAnswer(this.answer1, this.answer2, this.answer3).subscribe((answerSave) => {
          alert('Mentés sikeres' + '\n' +
          this.answer1.text + ' ' + this.answer1.isCorrect + '\n' +
          this.answer2.text + ' ' + this.answer2.isCorrect + '\n' +
          this.answer3.text + ' ' + this.answer3.isCorrect);
          this.router.navigate(['questions/list']);
        });
      }, (error) => {
        console.log('Error', error);
      });
    }
  }

  delete() {
    this.questionService.deleteQuestion(this.question.id).subscribe((result) => {
      this.router.navigate(['questions/list']);
    }, error => console.log('Error', error));
  }

  isCreateMode(): boolean {
    return !this.question.id;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogQuestionContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'question-edit-create-dialog-component',
  templateUrl: 'question-edit-create-dialog-component.html'
})

export class DialogQuestionContent {}
