import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  constructor(private router: Router) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() : void {
    if (this.username == 'admin' && this.password == 'admin') {
     this.router.navigate(['user']);
    } else {
      alert("Invalid credentials");
    }
  }

}

