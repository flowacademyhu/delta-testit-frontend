import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/users');
  }

  getUser(id: number) {
    return this.httpClient.get('http://localhost:8080/users/' + id);
  }

  createUser(user: UserModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/users', user);
  }

  editUser(user: UserModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/users/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete('http://localhost:8080/user/' + id);
  }
}


