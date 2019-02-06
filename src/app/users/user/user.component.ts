import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  @Input() user: UserModel;

  @Output() userDelete = new EventEmitter<UserModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource;

  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'email', 'role', 'edit'];

  constructor(private userService: UserService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/delete_icon.svg')
    );

  }

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.dataSource = new MatTableDataSource<UserModel>(users);
      this.dataSource.paginator = this.paginator;
    });

  }

  delete() {
    this.userService.deleteUser(this.user.id).subscribe((result) => {
      this.userDelete.next(this.user);
    }, error => console.log('Error', error));
  }

}
