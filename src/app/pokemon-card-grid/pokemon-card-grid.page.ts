import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'pokemon-card-grid',
  templateUrl: 'pokemon-card-grid.page.html',
  styleUrls: ['pokemon-card-grid.page.scss'],
})
export class PokemonCardGridComponent implements OnInit {

  public pokeApiResult: PokemonGeneral;
  private isLoading: boolean;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.createLoading('Fetching pokemon info...')
      .then(this.requestPokeAPI.bind(this))
      .then(() => this.loadingController.dismiss());
  }

  requestPokeAPI() {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon').toPromise()
      .then(this.assignResponse.bind(this));
  }

  assignResponse(response: PokemonGeneral) {
    this.pokeApiResult = response;
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
