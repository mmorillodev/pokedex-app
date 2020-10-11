import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.page.html',
  styleUrls: ['./pokemon-stats.page.scss'],
})
export class PokemonStatsPage implements OnInit {

  data: any;

  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.data = getNav.extras.state.valueToSend;
      }
    });
  }

  setStyle(value: string): void {
    this.elementRef.nativeElement.style.setProperty('--my-var', value);
  }

  getStats(index: number) {
    if (index <= 5) {
      let status = [];
      this.data['stats'].forEach(function (value) {
        status.push(value['base_stat'])
      });
      return status[index];
    } else {
      console.log("Index must be less than 6")
    }
  }

  ngOnInit() {
    this.setStyle('#FFA34E')
  }
}
