import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/results');
  }

  getResult(id: number) {
    return this.httpClient.get('http://localhost:8080/results/' + id);
  }

  createResult(result: ResultModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/results', result);
  }

  editResult(result: ResultModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/results/' + result.id, result);
  }

  deleteResult(id: number) {
    return this.httpClient.delete('http://localhost:8080/results/' + id);
  }
}
