import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';

import { DEFAULT_POKE_API_URL, BASE_POKE_API_URL } from '../../resources/strings';
import { PokeAPIResult, PokeAPIPokemon } from '../../interfaces/PokeAPIResult';
import { CompletePokemon } from '../../interfaces/CompletePokemonResult';

import { arrayIncludesString, stringIncludes, normalizeString } from '../../utils/utils';

@Component({
  selector: 'app-pokemon-card-grid',
  templateUrl: 'pokemon-card-grid.component.html',
  styleUrls: ['pokemon-card-grid.component.scss'],
})
export class PokemonCardGridComponent implements OnInit {

  @Input() public filterClause: string;
  @Input() public filterType: string;

  public pokeApiResult: PokeAPIResult;

  public loading = true;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController, private alertController: AlertController) { }

  public async ngOnInit() {
    await this.createLoading('Fetching pokemon info...');
    await this.requestPokeAPI();
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
    if (!this.filterClause && this.pokeApiResult.next) {
      const response: PokeAPIResult = await this.makeRequest(this.pokeApiResult.next) as PokeAPIResult;
      this.appendPokemonAndSetNext(response);
    }

    infinityScrollEvent.target.complete();
  }

  private makeRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  private appendPokemonAndSetNext(response: PokeAPIResult) {
    this.pokeApiResult.results = [
      ...this.pokeApiResult.results,
      ...response.results
    ];
    this.pokeApiResult.next = response.next;
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

  public async tryFilterRequestOtherwise() {

    await this.createLoading('Fetching pokemon info...');

    const filterTypeHandlers = {
      'pokemon': ((pokeApiPokemon: PokeAPIPokemon) => {
        return pokeApiPokemon.name === this.filterClause
          || pokeApiPokemon.additionalInfo.id.toString() === this.filterClause;
      })
    };

    const filtered = this.pokeApiResult.results.filter((pokeApiPokemon: PokeAPIPokemon) => {
      const filterHandler = filterTypeHandlers[this.filterType];

      return filterHandler ? filterHandler(pokeApiPokemon) : false;
    });

    if (filtered.length <= 0) {
      return this.getSearched();
    }

    await this.dismissLoading();
    return filtered;
  }

  public async getSearched() {
    let returnStatement = [];
    try {
      returnStatement = await this.requestAndGetResponse();
    } catch (e) {
      this.showAlert({
        header: 'Erro',
        subHeader: 'dps arrumo saporra kkkk'
      });
    }

    return returnStatement;
  }

  private async requestAndGetResponse() {
    const targetURL = `${BASE_POKE_API_URL}/${this.filterType}/${this.filterClause}`;
    const response = await this.makeRequest(targetURL);

    let returnValue = [];
    if (this.isTypeRequest(response)) {
      returnValue = response.pokemon.map(singlePokemonTypeResponse => ({
        name: singlePokemonTypeResponse.pokemon.name,
        url: singlePokemonTypeResponse.pokemon.url,
      }), {});
    }
    else {
      returnValue = [{
        name: response.name,
        url: targetURL
      }];
    }

    return [];
  }

  private isTypeRequest(response): boolean {
    return response.pokemon;
  }

  private async showAlert({header, subHeader, message}: Alert) {
    await (
      await this.alertController.create({
        cssClass: "pokemon-grid__alert",
        header,
        subHeader,
        message
      })
    ).present();
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

interface Alert {
  header: string;
  subHeader?: string;
  message?: string;
  cssClass?: string;
}
