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
  public filteredPokemons: SinglePokemon[];
  // TODO - Create an event that will be triggered when this var change
  @Input() public filter: string;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.createLoading('Fetching pokemon info...')
      .then(this.requestPokeAPI.bind(this))
      .then(() => this.loadingController.dismiss());
  }

  // TODO - when this event is triggered, add the pokemon infos to pokeApiResult and filteredPokemons variables
  public onPokemonFetchComplete(event: any) {
    console.log(event);
  }

  private requestPokeAPI() {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon').toPromise()
      .then(this.assignResponse.bind(this));
  }

  private assignResponse(response: PokemonGeneral) {
    this.pokeApiResult = response;
    this.filteredPokemons = response.results;
  }

  private async createLoading(message: string) {
    const loading = await this.loadingController.create({
      message
    });

    return await loading.present();
  }

  // TODO - Call this when filter variable changes
  private applyFilter() {
    this.filteredPokemons = this.pokeApiResult.results.filter(this.filterHandler.bind(this));
  }

  private filterHandler(pokemon: SinglePokemon) {
    const normalizedPokeName = this.normalizeString(pokemon.name);
    const normalizedFilter = this.normalizeString(this.filter);

    return normalizedPokeName.includes(normalizedFilter);
  }

  private normalizeString(value: string) {
    return value.trim().toLocaleLowerCase();
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
