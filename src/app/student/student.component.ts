import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
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

  }
}
