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
  @Input() module: boolean = true;

  constructor(private elementRef: ElementRef) { }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  public async setStyle(value: string) {
    await this.elementRef.nativeElement.style.setProperty('--widgth', value);
  }

  async ngOnInit() {
    await this.delay(250);
    await this.setStyle(this.widght)
  }

}
