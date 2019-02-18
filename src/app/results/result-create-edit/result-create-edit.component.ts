import { Component, OnInit, Optional, Inject } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { TestModel } from 'src/app/models/test.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-result-create-edit',
  templateUrl: './result-create-edit.component.html',
  styleUrls: ['./result-create-edit.component.scss']
})
export class ResultCreateEditComponent implements OnInit {

  public test: TestModel = {} as TestModel;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TestModel,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {
    this.test = Object.assign({}, data);

   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.testService.getTest(params.id).subscribe((result: TestModel) => {
          this.test = result ? result : {} as TestModel;
        });
      }
    });


  }


}
