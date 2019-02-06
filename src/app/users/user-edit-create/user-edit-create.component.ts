import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-create',
  templateUrl: './user-edit-create.component.html',
  styleUrls: ['./user-edit-create.component.scss']
})
export class UserEditCreateComponent implements OnInit {

  public user: UserModel = {} as UserModel;

  public userForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.userService.getUser(params.id).subscribe((result: UserModel) => {
          this.user = result ? result : {} as UserModel;
        });
      }
    });

    this.userForm = new FormGroup({
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }


  save() {
    if (this.userForm.valid) {
      if (!this.isCreateMode()) {
        this.userService.editUser(this.user).subscribe((result) => {
          alert('Mentés sikeres');
          this.router.navigate(['users/list']);
        }, (error) => {
          console.log('Error', error);
        });
      } else {
        this.userService.createUser(this.user).subscribe((result) => {
          alert('Mentés sikeres');
          this.router.navigate(['users/list']);
        }, (error) => {
          console.log('Error', error);
        });
      }
    }
  }

  delete() {
    this.userService.deleteUser(this.user.id).subscribe((result) => {
      this.router.navigate(['users/list']);
    }, error => console.log('Error', error));
  }

  isCreateMode(): boolean {
    return !this.user.id;
  }

}
