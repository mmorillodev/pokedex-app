import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { PokeAPIResult, SimplePokemon } from '../../interfaces/PokeAPIResult';
import { CompletePokemon } from '../../interfaces/CompletePokemon';

@Component({
  selector: 'pokemon-card-grid',
  templateUrl: 'pokemon-card-grid.component.html',
  styleUrls: ['pokemon-card-grid.component.scss'],
})
export class PokemonCardGridComponent implements OnInit {

  public pokeApiResult: PokeAPIResult;
  @Input() public filterClause: string;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.createLoading('Fetching pokemon info...')
      .then(this.requestPokeAPI.bind(this))
      .then(() => this.loadingController.dismiss());
  }

  public onPokemonFetchComplete(pokemon: CompletePokemon) {
    this.completeSinglePokemonInfo(pokemon);
  }

  private completeSinglePokemonInfo(pokemon: CompletePokemon): void {
    const simplePokemonTarget = this.pokeApiResult.results.find(
      (simplePokemon: SimplePokemon) =>
        this.pokemonComparator(simplePokemon, pokemon)
    );

    console.log(simplePokemonTarget);
  }

  private requestPokeAPI() {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon').toPromise()
      .then(this.assignResponse.bind(this));
  }

  private assignResponse(response: PokeAPIResult) {
    this.pokeApiResult = response;
  }

  private async createLoading(message: string) {
    const loading = await this.loadingController.create({
      message
    });

    return await loading.present();
  }

  public filterHandler(pokemon: SimplePokemon) {
    const normalizedPokeName = this.normalizeString(pokemon.name);
    const normalizedFilter = this.normalizeString(this.filterClause);

    return normalizedPokeName.includes(normalizedFilter);
  }

  private pokemonComparator(simplePokemon: SimplePokemon, pokemon: CompletePokemon): boolean {
    return this.extractRefIdFromURL(simplePokemon.url) === pokemon.id;
  }

  private normalizeString(value: string) {
    return value?.trim().toLocaleLowerCase();
  }

  private extractRefIdFromURL(url: string): number {
    const splittedUrl = url.split('/');

    return Number(splittedUrl[splittedUrl.length - 2]);
  }
}
