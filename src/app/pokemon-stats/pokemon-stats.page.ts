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
    try {
      this.route.queryParams.subscribe(params => {
        let getNav = this.router.getCurrentNavigation();
        if (getNav.extras.state) {
          this.data = getNav.extras.state.valueToSend;
        }
      });
    } catch (error) {
      this.router.navigate(['/home']);
    }
  }

  setStyle(variable: string, value: string): void {
    this.elementRef.nativeElement.style.setProperty(variable, value);
  }

  getStats(index: number) {
    let status = this.data.stats.map(function (value) {
      return value.base_stat
    });
    return status[index];
  }

  getStatsToArray() {
    let array = this.data.stats.map(function (status) {
      return status.base_stat
    });
    return array
  }

  private maiorValor(array = []) {
    return array.sort(function (a, b) { return b - a; })[0];
  }

  private getWidght(value: number) {
    let sum = (this.maiorValor(this.getStatsToArray()) + 20)
    value *= 100;
    let percentual = value / sum;
    return percentual;
  }

  public formatAtributes(atribute: string) {
    if (atribute.length == 1) {
      atribute = "0," + atribute;
      return atribute;
    } else if (atribute.length > 1) {
      atribute = atribute.substr(0, (atribute.length - 1)) + "," + atribute.substr((atribute.length - 1));
      return atribute;
    }
  }

  public backToHome() {
    if (this.data.name = null) {
      console.log('teste')
    }
  }

  ngOnInit() {
  }
}
