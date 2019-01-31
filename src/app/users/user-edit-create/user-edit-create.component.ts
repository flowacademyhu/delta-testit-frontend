import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-edit-create',
  templateUrl: './user-edit-create.component.html',
  styleUrls: ['./user-edit-create.component.scss']
})
export class UserEditCreateComponent implements OnInit {

  public user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
