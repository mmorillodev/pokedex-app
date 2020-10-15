import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public returnUrl = '/home';

  public email: string;
  public password: string;
  public repeatPassword: string;


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });
  }

  singup() {
    console.log('email', this.email);
    console.log('password', this.password);
    console.log('repeat password', this.repeatPassword);
    console.log('password match', this.password === this.repeatPassword);
  }
}
