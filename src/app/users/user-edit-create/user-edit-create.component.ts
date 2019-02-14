import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-edit-create',
  templateUrl: './user-edit-create.component.html',
  styleUrls: ['./user-edit-create.component.scss']
})
export class UserEditCreateComponent implements OnInit {

  public user: UserModel = {} as UserModel;
  public createdUser: UserModel[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserEditCreateComponent>
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.userService.getUser(params.id).subscribe((result: UserModel) => {
          this.user = result ? result : {} as UserModel;
        });
      }
    });
  }

  save() {
    if (!this.isCreateMode()) {
      this.userService.editUser(this.user).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['users/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.userService.createUser(this.user).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['users/list']);
      }, (error) => {
        console.log('Error', error);
      });
    }
  }

  delete() {
    this.userService.deleteUser(this.user.id).subscribe((result) => {
      this.router.navigate(['users/list']);
    }, error => console.log('Error', error));
  }

  isCreateMode(): boolean {
    return !this.user.id;
  }

}
