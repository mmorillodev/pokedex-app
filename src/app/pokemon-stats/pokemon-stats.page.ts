import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.page.html',
  styleUrls: ['./pokemon-stats.page.scss'],
})
export class PokemonStatsPage implements OnInit {

  public pokemon: any;
  public pokemonStatus: number[] = []
  private highestStatus: number

  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.pokemon = getNav.extras.state.valueToSend;
      }
    });
  }

  private getStatsToArray() {
    let array = this.pokemon.stats.map(function (status) {
      return status.base_stat
    });
    this.pokemonStatus = array
  }

  private highestStatusInArray() {
    this.highestStatus = this.pokemonStatus.map((x) => x).sort(function (a, b) { return b - a; })[0];
  }

  public getWidghtInPercentual(pokemonStatus: number) {
    let newHighestStatus = this.highestStatus + 20
    pokemonStatus *= 100;
    let percentual = (pokemonStatus / newHighestStatus).toString() + "%";
    return percentual;
  }

  public formatPokemonAtributes(atribute: string) {
    if (atribute.length == 1) {
      atribute = "0," + atribute;
      return atribute;
    } else {
      atribute = atribute.substr(0, (atribute.length - 1)) + "," + atribute.substr((atribute.length - 1));
      return atribute;
    }
  }

  ngOnInit() {
    this.getStatsToArray()
    this.highestStatusInArray()
  }
}


