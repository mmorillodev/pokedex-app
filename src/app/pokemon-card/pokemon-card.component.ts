import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { CompletePokemon } from '../../interfaces/CompletePokemon';
import colors from '../../resources/colors';
import { BASE_POKE_API_URL } from '../../resources/strings';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: 'pokemon-card.component.html',
  styleUrls: ['pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {

  @Input() public name: string;
  @Input() public url!: string;
  @Input() public favoritePage: boolean = false;
  @Output() pokemonFetchComplete: EventEmitter<CompletePokemon>;
  @Input() public pokemonRefId: number;

  public pokemon: any;
  public fetchCompleted = false;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.pokemonFetchComplete = new EventEmitter<CompletePokemon>();
  }

  public sendInfoByState() {
    let navigationExtras: NavigationExtras = {
      state: {
        valueToSend: this.infoToPokemonPage()
      }
    };
    this.router.navigate(['/pokemon'], navigationExtras);
  }

  private infoToPokemonPage() {
    let valueToSend = {
      pokemon_id: this.pokemon.id,
    };

    return valueToSend;
  }

  public ngOnInit(): void {
    if (this.favoritePage == false) {
      this.extractRefIdFromPokemonUrl();
      this.startPokemonFetch();
    } else {
      this.startPokemonFetchToFavorite();
    }
  }

  private async startPokemonFetch() {
    const response = await this.makeGetRequest(this.url) as CompletePokemon;
    this.assignPokemonAndColor(response);
    this.finishPokemonFetch();
  }

  private async startPokemonFetchToFavorite() {
    const response = await this.makeGetRequest(`${BASE_POKE_API_URL}/pokemon/` + this.pokemonRefId + `/`) as CompletePokemon;
    this.assignPokemonAndColor(response);
    this.finishPokemonFetch();
  }

  private finishPokemonFetch() {
    this.fetchCompleted = true;
    this.pokemonFetchComplete.emit(this.pokemon);
  }

  private makeGetRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  private makeGetRequestToFavorite(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  private assignPokemonAndColor(pokemon: CompletePokemon) {
  this.pokemon = pokemon;
  this.pokemon.types.forEach(type => {
    type.type.color = `#${colors[type.type.name]}`;
  });
}

  private extractRefIdFromPokemonUrl() {
  const splittedUrl = this.url.split('/');
  this.pokemonRefId = Number(splittedUrl[splittedUrl.length - 2]);
}
}
