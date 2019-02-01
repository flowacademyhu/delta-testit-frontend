import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> { 
    return this.httpClient.get('http://localhost:8080/users');
  }

  get(id: number) {
    return this.httpClient.get('http://localhost:8080/users/id');
  }
}


