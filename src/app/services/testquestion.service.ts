import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestQuestionModel } from '../models/testquestion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestquestionService {

  constructor(private httpClient: HttpClient) {}

  createTestQuestion(testquestion: TestQuestionModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/testquestion', testquestion);
  }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/testquestion');
  }
}
