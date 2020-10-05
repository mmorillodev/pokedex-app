import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listItems = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor() {}

}
