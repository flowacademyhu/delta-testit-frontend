import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from '../models/role';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value).pipe(first())
      .subscribe(
        currentUser => {
          console.log(currentUser);
          if (currentUser.role === Role.Admin || currentUser.role === Role.Mentor) {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/student']);
          }
        },
        error => {
          alert('Authentication failed');
        }
      );
    }
    this.formSubmitAttempt = true;
  }
}


