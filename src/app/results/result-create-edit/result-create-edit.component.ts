import { Component, OnInit, Optional, Inject } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { TestModel } from 'src/app/models/test.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { GroupModel } from 'src/app/models/group.model';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { ResultService } from 'src/app/services/result.service';
import { ResultModel } from 'src/app/models/result.model';

@Component({
  selector: 'app-result-create-edit',
  templateUrl: './result-create-edit.component.html',
  styleUrls: ['./result-create-edit.component.scss']
})
export class ResultCreateEditComponent implements OnInit {

  public test: TestModel = {} as TestModel;
  public result: ResultModel = {} as ResultModel;
  public user: UserModel = {} as UserModel;
  public groups: GroupModel[] = [];
  public students: UserModel[] = [];
  public selectedGroupId: number;
  public userId: number[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TestModel,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private resultService: ResultService,
    private groupService: GroupService,
    private userService: UserService
  ) {
    this.test = Object.assign({}, data);

  }

  ngOnInit() {
    console.log(this.userId);
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.testService.getTest(params.id).subscribe((result: TestModel) => {
          this.test = result ? result : {} as TestModel;
        });
      }
    });

    this.groupService.getAll().subscribe(groups => {
      this.groups = groups;
    });

    this.userService.getAll().subscribe(users => {
      this.students = users;
    });
  }

  save() {
    this.test.userIds = this.userId;
    this.testService.createResult(this.test).subscribe((result) => {
      console.log(this.userId);
      alert('Mentés sikeres');
      this.router.navigate(['results/list']);
    }, (error) => {
      console.log('Error', error);
    });
  }

  checkValue(event: any) {
    console.log(event.source.value);
    this.userId.push(event.source.value);
  }


}
