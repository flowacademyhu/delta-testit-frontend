import { Observable } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from './../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  private loggedIn = new BehaviorSubject<boolean>(false);

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
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(decodedToken));
            this.currentUserSubject.next(decodedToken.data);
            console.log(user.token);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
