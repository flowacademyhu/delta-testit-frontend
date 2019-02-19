import { Component, OnInit, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SubjectModel } from 'src/app/models/subject.model';
import { AnswerService } from 'src/app/services/answer.service';
import { AnswerModel } from 'src/app/models/answer.model';
import { FormBuilder } from '@angular/forms';
import { MatIconRegistry, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-question-edit-create',
  templateUrl: './question-edit-create.component.html',
  styleUrls: ['./question-edit-create.component.scss']
})
export class QuestionEditCreateComponent implements OnInit {

  @Input() answer: AnswerModel = {} as AnswerModel;
  @Output() answerDelete = new EventEmitter<AnswerModel>();

  public question: QuestionModel = {} as QuestionModel;

  public subject: SubjectModel = {} as SubjectModel;
  public subjects: SubjectModel[] = [];

  //public answer: AnswerModel = {} as AnswerModel;
  public answers: AnswerModel[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: QuestionModel,
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/delete_icon.svg')
    );

    this.question = Object.assign({}, data);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.questionService.getQuestion(params.id).subscribe((result: QuestionModel) => {
          this.question = result ? result : {} as QuestionModel;
        });
      }
    });

    this.subjectService.getAll().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  onAddNewAnswer() {
    this.answers.push(new AnswerModel());
    console.log('Valaszok tomb: ' + this.answer);
  }

  onDeleteLastAnswer(answer: AnswerModel) {
    this.answers.pop();
  }

  checkValue(event: any) {
    this.answer.isCorrect = event.checked;
    console.log('isCorrect: ' + this.answer.isCorrect);
  }

  save() {
    this.question.answers = this.answers;
    console.log('Answer model: ' + JSON.stringify(this.question.answers));
    if (!this.isCreateMode()) {
      this.questionService.editQuestion(this.question).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['questions/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      console.log('QuestionModel with AnswerModel: ' + JSON.stringify(this.question));
      this.questionService.createQuestion(this.question).subscribe((result) => {
        this.answer.questionId = result.id;
        alert('Mentés sikeres');
        this.router.navigate(['questions/list']);
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

}
