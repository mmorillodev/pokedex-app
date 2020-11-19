import { Component, Input, OnInit } from '@angular/core';

import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.page.html',
  styleUrls: ['./progress-bar.page.scss'],
})
export class ProgressBarPage implements OnInit {

  @Input() widght: string;
  @Input() statsValue: number;
  @Input() textStats: string;
  @Input() color: string;

  constructor(private elementRef: ElementRef) { }

  public setStyle(value: string) {
    this.elementRef.nativeElement.style.setProperty('--widgth', value);
  }

  ngOnInit() {
    this.setStyle(this.widght)
  }

}
