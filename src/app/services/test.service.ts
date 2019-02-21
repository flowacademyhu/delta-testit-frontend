import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestModel } from '../models/test.model';
import { ResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/tests');
  }

  getTest(id: number) {
    return this.httpClient.get('http://localhost:8080/tests/' + id);
  }

  createTest(test: TestModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/tests', test);
  }

  createResult(test: TestModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/tests/' + test.id, test);
  }

  editTest(test: TestModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/tests/' + test.id, test);
  }

  deleteTest(id: number) {
    return this.httpClient.delete('http://localhost:8080/tests/' + id);
  }

}
