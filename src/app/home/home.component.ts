import { UserModel } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../auth/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  currentUser: UserModel;
  userFromApi: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.userService.getUser(this.currentUser.id).pipe(first()).subscribe(user => { 
    this.userFromApi = user;
  });

}}
