import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public email: string;
  public password: string;
  public repeatPassword: string;

  constructor() {}

  ngOnInit() {
  }

  signup() {
    console.log('email', this.email);
    console.log('password', this.password);
    console.log('repeat password', this.repeatPassword);
    console.log('password match', this.password === this.repeatPassword);
  }
}
