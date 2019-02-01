import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  @Input() user: UserModel;

  @Output() userDelete = new EventEmitter<UserModel>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  delete() {
    this.userService.deleteUser(this.user.id).subscribe((result) => {
      this.userDelete.next(this.user);
    }, error => console.log('Error', error));
  }

}
