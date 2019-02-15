import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  public groups: GroupModel[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getAll().subscribe(groups => {
      this.groups = groups;
    });
  }

}
