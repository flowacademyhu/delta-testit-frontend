import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      console.log('Users: ' + users);
    })
  }

}
