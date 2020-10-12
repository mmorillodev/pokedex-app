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
  teste: string = '50%';

  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.data = getNav.extras.state.valueToSend;
      }
    });
  }

  setStyle(variable: string, value: string): void {
    this.elementRef.nativeElement.style.setProperty(variable, value);
  }

  getStats(index: number) {
    let status = [];
    this.data['stats'].forEach(function (value) {
      status.push(value['base_stat'])
    });
    let stat: number = status[index];
    return stat;
  }

  getStatsToArray() {
    let status = [];
    this.data['stats'].forEach(function (value) {
      status.push(value['base_stat'])
    });
    return status;
  }

  public getColor(index: number) {
    let colors = []
    this.data['type'].forEach(function (value) {
      colors.push(value['type'].color)
    });

    return colors[index]
  }

  public totalStats() {
    let sum: number = 0;
    let array = this.getStatsToArray()
    array.forEach(function (value) {
      sum += value;
    });
    return sum;
  }

  private maiorValor(array = [], index: number) {
    return array.sort(function (a, b) { return b - a; })[index];
  }

  private getWidght(value: number) {
    let sum = (this.maiorValor(this.getStatsToArray(), 0) + 20)
    value *= 100;
    let percentual = value / sum;
    return percentual;
  }

  public formatAtributes(atribute: string) {
    if (atribute.length == 1) {
      atribute = "0," + atribute;
      return atribute;
    } else if (atribute.length > 1) {
        atribute = atribute.substr(0, (atribute.length - 1))+ "," + atribute.substr((atribute.length -1));
        return atribute;
    }
  }

  ngOnInit() {
    this.setStyle('--my-var', this.getColor(0))
    this.setStyle('--HP', this.getWidght(this.getStats(0)).toString() + '%')
    this.setStyle('--ATK', this.getWidght(this.getStats(1)).toString() + '%')
    this.setStyle('--DEF', this.getWidght(this.getStats(2)).toString() + '%')
    this.setStyle('--SPD', this.getWidght(this.getStats(5)).toString() + '%')
    this.setStyle('--SP_A', this.getWidght(this.getStats(3)).toString() + '%')
    this.setStyle('--SP_D', this.getWidght(this.getStats(4)).toString() + '%')
    console.log(this.formatAtributes('440'))
  }
}
