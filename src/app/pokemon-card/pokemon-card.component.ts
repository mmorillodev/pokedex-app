import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { CompletePokemon } from '../../interfaces/CompletePokemon';
import colors from '../../resources/colors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: 'pokemon-card.component.html',
  styleUrls: ['pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {

  @Input() public name: string;
  @Input() public url!: string;
  @Output() pokemonFetchComplete: EventEmitter<CompletePokemon>;

  public pokemonRefId: number;
  public pokemon: CompletePokemon;
  public fetchCompleted = false;
  private valueToSend;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.pokemonFetchComplete = new EventEmitter<CompletePokemon>();
  }

  sendInfoByState() {
    let navigationExtras: NavigationExtras = {
      state: {
        valueToSend: this.value()
      }
    };
    this.router.navigate(['/pokemon'], navigationExtras);
  }

  value() {
    return this.valueToSend = {
      name: this.name,
      pokemon_img: this.pokemon.sprites.other['official-artwork'].front_default,
      pokemon_id: this.pokemon.id,
      type: this.pokemon.types,
      weight: this.pokemon.weight,
      height: this.pokemon.height,
      stats: this.pokemon.stats
    };
  }

  public toString(){
    console.log()
  }

  public ngOnInit(): void {
    this.extractRefIdFromPokemonUrl();
    this.startPokemonFetch();
  }

  private async startPokemonFetch() {
    const response = await this.makeGetRequest(this.url) as CompletePokemon;
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
