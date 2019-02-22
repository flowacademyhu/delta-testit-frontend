import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { UserModel } from 'src/app/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { GroupService } from 'src/app/services/group.service';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss']
})
export class ProfilEditComponent implements OnInit {

  public user: UserModel = {} as UserModel;
  public groups: GroupModel[] = [];
  currentUser: UserModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private groupService: GroupService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfilEditComponent>
  ) {
    this.authService.currentUser.subscribe(x => { this.currentUser = x;
    });
  }

  ngOnInit() {
    this.userService.getUser(this.currentUser.id).subscribe((result: UserModel) => {
      this.user = result ? result : {} as UserModel;
    });

    this.groupService.getAll().subscribe(groups => {
      this.groups = groups;
    });
  }

  save() {
    this.userService.editUser(this.user).subscribe((result) => {
      alert('Mentés sikeres');
    }, (error) => {
      console.log('Error', error);
    });
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
