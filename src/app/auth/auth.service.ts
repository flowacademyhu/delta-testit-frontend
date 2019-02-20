import { Observable } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from './../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
}

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.token = localStorage.getItem('jwt');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(userLogin: UserModel) {
    return this.httpClient.post<UserModel>('http://localhost:8080/users/login', {
      email: userLogin.email,
      password: userLogin.password
    })
      .pipe(
        map(user => {
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(user.token);
          if (user && user.token) {
            this.token = user.token;
            localStorage.setItem('currentUser', JSON.stringify(decodedToken.data));
            localStorage.setItem('jwt', user.token);
            this.currentUserSubject.next(decodedToken.data);
          }
          return decodedToken.data;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
