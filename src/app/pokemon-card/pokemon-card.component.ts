import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CompletePokemon } from '../../interfaces/CompletePokemon';
import colors from '../../resources/colors';

@Component({
  selector: 'pokemon-card',
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
  public colors: object;

  constructor(private httpClient: HttpClient) {
    this.pokemonFetchComplete = new EventEmitter<CompletePokemon>();
  }

  ngOnInit(): void {
    this.extractRefIdFromPokemonUrl();
    this.startPokemonFetch();
  }

  startPokemonFetch() {
    this.httpClient.get(this.url).toPromise()
      .then(this.assignPokemon.bind(this))
      .then(this.finishPokemonFetch.bind(this));
  }

  finishPokemonFetch() {
    this.fetchCompleted = true;
    this.pokemonFetchComplete.emit(this.pokemon);
  }

  assignPokemon(pokemon: CompletePokemon) {
    this.pokemon = pokemon;
    this.pokemon.types.forEach(type => {
      type.type.color = `#${colors[type.type.name]}`;
    });
  }

  extractRefIdFromPokemonUrl() {
    const splittedUrl = this.url.split('/');
    this.pokemonRefId = Number(splittedUrl[splittedUrl.length - 2]);
  }
}
