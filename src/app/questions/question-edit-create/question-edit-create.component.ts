import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SubjectModel } from 'src/app/models/subject.model';
import { AnswerService } from 'src/app/services/answer.service';
import { AnswerModel } from 'src/app/models/answer.model';


@Component({
  selector: 'app-question-edit-create',
  templateUrl: './question-edit-create.component.html',
  styleUrls: ['./question-edit-create.component.scss']
})
export class QuestionEditCreateComponent implements OnInit {

  public question: QuestionModel = {} as QuestionModel;

  public subject: SubjectModel = {} as SubjectModel;
  
  public answer: AnswerModel = {} as AnswerModel;

  constructor(private router: Router, private route: ActivatedRoute, private questionService: QuestionService,
    private answerService: AnswerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.questionService.getQuestion(params.id).subscribe((result: QuestionModel) => {
          this.question = result ? result : {} as QuestionModel;
        });
      }
    });
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
        this.answer.questionId = result.id;
        this.answerService.createAnswer(this.answer).subscribe((answerSave) => {
          alert('Mentés sikeres');
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


}
