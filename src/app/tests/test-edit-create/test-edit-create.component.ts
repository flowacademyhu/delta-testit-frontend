import { Component, OnInit } from '@angular/core';
import { TestModel } from 'src/app/models/test.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-test-edit-create',
  templateUrl: './test-edit-create.component.html',
  styleUrls: ['./test-edit-create.component.scss']
})

export class TestEditCreateComponent implements OnInit {

  public test: TestModel = {} as TestModel;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.testService.getTest(params.id).subscribe((result: TestModel) => {
        this.test = result ? result : {} as TestModel;
      });
    });
  }

  save() {
    if (!this.isCreateMode()) {
      this.testService.editTest(this.test).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['tests/list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.testService.createTest(this.test).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['tests/list']);
      }, (error) => {
        console.log('Error', error);
      });
    }
  }

  delete() {
    this.testService.deleteTest(this.test.id).subscribe((result) => {
      this.router.navigate(['tests/list']);
    }, error => console.log('Error', error));
  }

  isCreateMode(): boolean {
    return !this.test.id;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'test-edit-create-dialog-component',
  templateUrl: 'test-edit-create-dialog-component.html'
})

export class DialogContent {}
