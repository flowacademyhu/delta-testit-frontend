import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { MatPaginator, MatSort, MatIconRegistry, MatTableDataSource, MatDialog } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupEditCreateComponent } from '../group-edit-create/group-edit-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() group: GroupModel;

  @Output() groupDelete = new EventEmitter<GroupModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource;

  displayedColumns: string[] = ['id', 'name', 'description'];

  constructor(
    private router: Router,
    private groupService: GroupService,
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
    this.groupService.getAll().subscribe(groups => {
      this.dataSource = new MatTableDataSource<GroupModel>(groups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.groupService.deleteGroup(id).subscribe((result) => {
      this.groupDelete.next(this.group);
      this.loadData();
    }, error => console.log('Error', error));
  }

  openGroupDialog() {
    const dialogRef = this.dialog.open(GroupEditCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.groupService.createGroup(this.group).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['groups/list']);
      }, (error) => {
        console.log('Error', error);
      });
      console.log(`Dialog result: ${result}`);
    });
  }
}
