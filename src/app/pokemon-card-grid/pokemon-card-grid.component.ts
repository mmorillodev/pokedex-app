import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'pokemon-card-grid',
  templateUrl: 'pokemon-card-grid.component.html',
  styleUrls: ['pokemon-card-grid.component.scss'],
})
export class PokemonCardGridComponent implements OnInit {

  public pokeApiResult: PokemonGeneral;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController) { }

  public ngOnInit(): void {
    this.createLoading('Fetching pokemon info...')
      .then(this.requestPokeAPI.bind(this))
      .then(() => this.loadingController.dismiss());
  }

  public requestPokeAPI() {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon').toPromise()
      .then(this.assignResponse.bind(this));
  }

  public async fetchNextPokemonBatch(event) {
    await this.httpClient.get(this.pokeApiResult.next).toPromise()
      .then(this.appendPokemon.bind(this));

    event.target.complete();
  }

  private assignResponse(response: PokemonGeneral) {
    this.pokeApiResult = response;
  }

  private appendPokemon(response: PokemonGeneral) {
    this.pokeApiResult.results = [
      ...this.pokeApiResult.results,
      ...response.results
    ];
    this.pokeApiResult.next = response.next;
  }

  async createLoading(message: string) {
    const loading = await this.loadingController.create({
      message
    });

    return await loading.present();
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
