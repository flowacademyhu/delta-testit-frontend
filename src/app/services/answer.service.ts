import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerModel } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) {}

  createAnswer(answer1: AnswerModel, answer2: AnswerModel, answer3: AnswerModel): Observable<any> {
    if (answer1) {
      return this.httpClient.post('http://localhost:8080/answer', answer1)
    }
    if (answer2) {
      return this.httpClient.post('http://localhost:8080/answer', answer2)
    }
    if (answer3) {
      return this.httpClient.post('http://localhost:8080/answer', answer3)
    }
  }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/answer');
  }
}
