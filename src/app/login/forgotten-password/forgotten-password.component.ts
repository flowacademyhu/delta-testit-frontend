import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  private form: FormGroup;
  private formSubmitAttempt: boolean;

  public user: UserModel = {} as UserModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }


  save() {
    this.userService.sendPassword(this.user).subscribe((result) => {
      this.snackBar.open('The new password has sent to your email', 'X', { duration: 5000 } );
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('Error', error);
    });
  }
}
