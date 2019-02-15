import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { User } from '../auth/user';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { Role } from '../models/role';
import { UserEditCreateComponent } from '../users/user-edit-create/user-edit-create.component';
import { SubjectEditCreateComponent } from '../subjects/subject-edit-create/subject-edit-create.component';
import { SubjectComponent } from '../subjects/subject/subject.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  currentUser: UserModel;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/home_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/search_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'account',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/account_icon.svg')
    );

    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
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

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(UserEditCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}