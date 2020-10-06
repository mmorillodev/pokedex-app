import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pokemon-card',
  templateUrl: 'pokemon-card.page.html',
  styleUrls: ['pokemon-card.page.scss'],
})
export class PokemonCardComponent implements OnInit {

  @Input() name: string;
  @Input() url!: string;
  pokemonRefId: number;
  pokemon: Pokemon;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const splittedUrl = this.url.split('/');

    this.pokemonRefId = Number(splittedUrl[splittedUrl.length - 2]);

    this.httpClient.get(this.url).toPromise().then((pokemon: Pokemon) => {
      this.pokemon = pokemon;
    });
  }
}

interface Pokemon {
  abilities: PokemonAbility[];
  sprites: Sprites;
}

interface PokemonAbility {

}

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: object;
}