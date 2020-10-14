import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { DEFAULT_POKE_API_URL } from '../../resources/strings';
import { PokeAPIResult, PokeAPIPokemon } from '../../interfaces/PokeAPIResult';
import { CompletePokemon } from '../../interfaces/CompletePokemon';

import { arrayIncludesString, stringIncludes, normalizeString } from '../../utils/utils';

@Component({
  selector: 'app-pokemon-card-grid',
  templateUrl: 'pokemon-card-grid.component.html',
  styleUrls: ['pokemon-card-grid.component.scss'],
})
export class PokemonCardGridComponent implements OnInit {

  @Input() public filterClause: string;

  public limit = 20;
  public pokeApiResult: PokeAPIResult;
  public loading = true;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController) { }

  public async ngOnInit() {
    await this.createLoading('Fetching pokemon info...');
    this.requestPokeAPI();
    this.dismissLoading();
  }

  public async requestPokeAPI() {
    const response: PokeAPIResult = await this.makeRequest(DEFAULT_POKE_API_URL) as PokeAPIResult;    
    this.assignResponse(response);
  }

  private assignResponse(response: PokeAPIResult) {
    this.pokeApiResult = response;
  }

  public async fetchNextPokemonBatch(infinityScrollEvent) {
    this.limit += 20;
    infinityScrollEvent.target.complete();
  }

  private makeRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
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

  private async createLoading(message: string) {

    this.loading = true;

    const loading = await this.loadingController.create({
      message
    });

    return await loading.present();
  }

  private async dismissLoading() {
    this.loading = false;
    await this.loadingController.dismiss();
  }

  public filterHandler(pokeAPIPokemon: PokeAPIPokemon): boolean {
    const { name } = pokeAPIPokemon;

    return stringIncludes(name, this.filterClause);
  }

  private compareSimpleAndCompletePokemons(pokeAPIPokemon: PokeAPIPokemon, completePokemon: CompletePokemon): boolean {
    return this.extractRefIdFromURL(pokeAPIPokemon.url) === completePokemon.id;
  }

  private extractRefIdFromURL(url: string): number {
    const spittedUrl = url.split('/');

    return Number(spittedUrl[spittedUrl.length - 2]);
  }

  public stringIsEmpty(value: string) {
    return value === undefined || value === null || value <= ' ';
  }
}
