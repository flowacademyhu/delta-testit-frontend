import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionModel } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/questions');
  }

  getQuestion(id: number) {
    return this.httpClient.get('http://localhost:8080/questions/' + id);
  }

  createQuestion(question: QuestionModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/questions', question);
  }

  editQuestion(question: QuestionModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/questions/' + question.id, question);
  }

  deleteQuestion(id: number) {
    return this.httpClient.delete('http://localhost:8080/questions/' + id);
  }
}
