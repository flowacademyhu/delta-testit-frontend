import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public dataEdited = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

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
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      groupId: user.groupId,
      role: user.role
    };
    if (!user.password) {
      delete body.password;
    }
    console.log(body);
    return this.httpClient.put('http://localhost:8080/users/' + user.id, body);
  }

  sendPassword(user: UserModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/users/login/password', user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete('http://localhost:8080/users/' + id);
  }
}


