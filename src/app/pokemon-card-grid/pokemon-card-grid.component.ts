import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { PokeAPIResult, PokeAPIPokemon } from '../../interfaces/PokeAPIResult';
import { CompletePokemon, Type } from '../../interfaces/CompletePokemon';

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

  public onPokemonFetchComplete(completePokemon: CompletePokemon) {
    this.completeSinglePokemonInfo(completePokemon);
  }

  private completeSinglePokemonInfo(completePokemon: CompletePokemon): void {
    const simplePokemonTarget = this.pokeApiResult.results.find(
      (pokeAPIPokemon: PokeAPIPokemon) =>
        this.compareSimpleAndCompletePokemons(pokeAPIPokemon, completePokemon)
    );

    simplePokemonTarget.additionalInfo = completePokemon;
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

  public filterHandler(pokeAPIPokemon: PokeAPIPokemon): boolean {
    const {
      name,
      additionalInfo: {
        id,
        types
      }
    } = pokeAPIPokemon;

    const normalizedFilterClause = this.normalizeString(this.filterClause);
    let validPokemon = false;

    if (this.normalizeString(name).includes(normalizedFilterClause)) {
      validPokemon = true;
    }

    if (this.normalizeString(id.toString()).includes(normalizedFilterClause)) {
      validPokemon = true;
    }

    const typesFinder = (type: Type) => 
      this.normalizeString(type.type.name).includes(normalizedFilterClause);

    if (types.some(typesFinder)) {
      validPokemon = true;
    }

    return validPokemon;
  }

  private compareSimpleAndCompletePokemons(pokeAPIPokemon: PokeAPIPokemon, completePokemon: CompletePokemon): boolean {
    return this.extractRefIdFromURL(pokeAPIPokemon.url) === completePokemon.id;
  }

  private normalizeString(value: string) {
    return value?.trim().toLocaleLowerCase();
  }

  private extractRefIdFromURL(url: string): number {
    const spittedUrl = url.split('/');

    return Number(spittedUrl[spittedUrl.length - 2]);
  }
}
