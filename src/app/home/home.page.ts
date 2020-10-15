import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public searchValue: string;

  constructor() {}

  public assignFilterClause({target: { value }}) {
    this.searchValue = value;
  }
}
