import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoosenanswerService {

  constructor(private httpClient: HttpClient) {}

  getAll(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/choosenanswers' + id);
  }
}
