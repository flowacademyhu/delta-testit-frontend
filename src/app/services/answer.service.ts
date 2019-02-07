import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerModel } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) {}

  createAnswer(answer: AnswerModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/answer', answer);
  }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/answer');
  }
}
