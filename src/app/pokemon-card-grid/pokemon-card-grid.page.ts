import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pokemon-card-grid',
  templateUrl: 'pokemon-card-grid.page.html',
  styleUrls: ['pokemon-card-grid.page.scss'],
})
export class PokemonCardGridComponent implements OnInit {

  public pokeApiResult: PokemonGeneral;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon') 
      .toPromise()
      .then((response: PokemonGeneral) => {
        this.pokeApiResult = response;
        console.log(this.pokeApiResult);
    });
  }
}

interface PokemonGeneral {
  count: number;
  next: string;
  previous: string;
  results: SinglePokemon[];
}

interface SinglePokemon {
  name: string;
  url: string;
}
