import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../../interfaces/Pokemon';

@Component({
  selector: 'pokemon-card',
  templateUrl: 'pokemon-card.page.html',
  styleUrls: ['pokemon-card.page.scss'],
})
export class PokemonCardComponent implements OnInit {

  @Input() public name: string;
  @Input() public url!: string;
  public pokemonRefId: number;
  public pokemon: Pokemon;
  public ready = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const splittedUrl = this.url.split('/');

    this.pokemonRefId = Number(splittedUrl[splittedUrl.length - 2]);

    this.httpClient.get(this.url).toPromise()
      .then((pokemon: Pokemon) => {
        this.pokemon = pokemon;
        this.ready = true;
      });
  }
}
