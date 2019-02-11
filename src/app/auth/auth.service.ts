import { UserService } from 'src/app/services/user.service';
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public userModel: UserModel;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private httpClient: HttpClient

  ) {}

  login(user: User) {
    return this.httpClient.post<{token: string}>('http://localhost:8080/users/login', {email: user.email, password: user.password})
      .pipe(map(result => {
          console.log(result);
          if (result && result.token) {
            localStorage.setItem('access_token', JSON.stringify(result.token));
            console.log(result.token);
            this.loggedIn.next(true);
            this.router.navigate(['/user']);
          }
          return result;
        })
      );
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}