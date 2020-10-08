import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../../interfaces/Pokemon';
import colors from '../../resources/colors';

@Component({
  selector: 'pokemon-card',
  templateUrl: 'pokemon-card.component.html',
  styleUrls: ['pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {

  @Input() public name: string;
  @Input() public url!: string;

  public pokemonRefId: number;
  public pokemon: Pokemon;

  public fetchCompleted = false;
  public colors: object;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.extractRefId();
    this.startPokemonFetch();
  }

  startPokemonFetch() {
    this.httpClient.get(this.url).toPromise()
      .then(this.assignPokemon.bind(this))
      .then(this.finishPokemonFetch.bind(this));
  }

  finishPokemonFetch() {
    this.fetchCompleted = true;
  }

  assignPokemon(pokemon: Pokemon) {
    this.pokemon = pokemon;
    this.pokemon.types.forEach(type => {
      type.type.color = `#${colors[type.type.name]}`;
    });
  }

  extractRefId() {
    const splittedUrl = this.url.split('/');
    this.pokemonRefId = Number(splittedUrl[splittedUrl.length - 2]);
  }
}
