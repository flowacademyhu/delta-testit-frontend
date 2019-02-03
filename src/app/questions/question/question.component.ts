import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: QuestionModel;

  @Output() questionDelete = new EventEmitter<QuestionModel>();
  constructor(private userService: QuestionService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );

  }

  ngOnInit() {
  }

  delete() {
    this.userService.deleteQuestion(this.question.id).subscribe((result) => {
      this.questionDelete.next(this.question);
    }, error => console.log('Error', error));
  }

}
