import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-edit-create',
  templateUrl: './group-edit-create.component.html',
  styleUrls: ['./group-edit-create.component.scss']
})
export class GroupEditCreateComponent implements OnInit {

 
  public group: GroupModel = {} as GroupModel;
  public createdGroup: GroupModel[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GroupEditCreateComponent>
    ) {
     }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.groupService.getGroup(params.id).subscribe((result: GroupModel) => {
          this.group = result ? result : {} as GroupModel;
        });
      }
    });
  }

  save() {
    if (!this.isCreateMode()) {
      this.groupService.editGroup(this.group).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['groups/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.groupService.createGroup(this.group).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['groups/list']);
      }, (error) => {
        console.log('Error', error);
      });
    }
  }
  
  isCreateMode(): boolean {
    return !this.group.id;
  }
}
