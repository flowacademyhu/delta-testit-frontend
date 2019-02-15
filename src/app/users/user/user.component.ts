import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { UserEditCreateComponent } from '../user-edit-create/user-edit-create.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  @Input() user: UserModel;

  @Output() userDelete = new EventEmitter<UserModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  public dataSource;

  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'email', 'role', 'edit'];

  constructor(
    private userService: UserService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog) {
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
    this.loadData();
  }

  private loadData() {
    this.userService.getAll().subscribe(users => {
      this.dataSource = new MatTableDataSource<UserModel>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe((result) => {
      this.userDelete.next(this.user);
      this.loadData();
    }, error => console.log('Error', error));
  }

  openUserDialog() {

    const dialogRef = this.dialog.open(UserEditCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
