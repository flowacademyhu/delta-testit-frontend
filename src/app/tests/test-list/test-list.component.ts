import { Component, OnInit } from '@angular/core';
import { TestModel } from '../../models/test.model';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {

  tests: TestModel[] = [];

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getAll().subscribe(tests => {
      this.tests = tests;
      console.log('Users: ' + tests);
    });
  }

}
