import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { DEFAULT_POKE_API_URL } from '../../resources/strings';

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

  public async requestPokeAPI() {
    const response: PokemonGeneral = await this.makeRequest(DEFAULT_POKE_API_URL) as PokemonGeneral;
    this.assignResponse(response);
  }

  public async fetchNextPokemonBatch(infinityScrollEvent) {
    const response: PokemonGeneral = await this.makeRequest(this.pokeApiResult.next) as PokemonGeneral;
    this.appendPokemonAndSetNext(response);
    infinityScrollEvent.target.complete();
  }

  private makeRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  private assignResponse(response: PokemonGeneral) {
    this.pokeApiResult = response;
  }

  private appendPokemonAndSetNext(response: PokemonGeneral) {
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
