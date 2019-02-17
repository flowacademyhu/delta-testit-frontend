import { Component, OnInit, Inject, Optional } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { GroupService } from 'src/app/services/group.service';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-user-edit-create',
  templateUrl: './user-edit-create.component.html',
  styleUrls: ['./user-edit-create.component.scss']
})
export class UserEditCreateComponent implements OnInit {

  public user: UserModel = {} as UserModel;
  public createdUser: UserModel[] = [];
  public groups: GroupModel[] = [];
  currentUser: UserModel;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private groupService: GroupService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserEditCreateComponent>
    ) {
      this.user = Object.assign({}, data);

      this.authService.currentUser.subscribe(x => this.currentUser = x);
     }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.userService.getUser(params.id).subscribe((result: UserModel) => {
          this.user = result ? result : {} as UserModel;
        });
      }
    });

    this.groupService.getAll().subscribe(groups => {
      this.groups = groups;
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


  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMentor() {
    return this.currentUser && this.currentUser.role === Role.Mentor;
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
}
