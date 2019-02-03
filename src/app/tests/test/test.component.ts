import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() test: TestModel;

  @Output() testDelete = new EventEmitter<TestModel>();

  constructor(private testService: TestService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/edit_icon.svg')
    );
  }
  
  ngOnInit() {
  }

  delete() {
    this.testService.deleteTest(this.test.id).subscribe((result) => {
      this.testDelete.next(this.test);
    }, error => console.log('Error', error));
  }

}
