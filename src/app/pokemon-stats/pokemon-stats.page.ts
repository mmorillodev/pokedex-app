import { Component, OnInit, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import colors from '../../resources/colors';

import { BASE_POKE_API_URL } from '../../resources/strings';
import { Pokemon } from '../../interfaces/PokemonSpecies';
import { PokemonEvolution } from '../../interfaces/PokemonEvolutions';
import { CompletePokemon } from 'src/interfaces/CompletePokemon';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.page.html',
  styleUrls: ['./pokemon-stats.page.scss'],
})
export class PokemonStatsPage implements OnInit {

 @Input() public name: string;

  public loading = true;
  public fetchCompleted = false;
  public pokemonByHome: any;
  public pokemonStatus: number[] = []
  private highestStatus: number;
  private pokemonUrl: string[] = []
  public pokemonSpecie: Pokemon;
  public pokemonEvolution: PokemonEvolution;
  public completePokemons: any[] = [];
  public pokemon: CompletePokemon;

  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router, private httpClient: HttpClient, private loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.pokemonByHome = getNav.extras.state.valueToSend;
      }
    });
  }

  public async requestPokemonFromAPI(id: number) {
    try {
      const response: CompletePokemon = await this.makeRequest(`${BASE_POKE_API_URL}/pokemon/` + id + `/`) as CompletePokemon;
      this.assignResponseToPokemon(response);
    } catch {
      return
    }
  }

  public async requestPokemonSpecieById(id: number) {
    try {
      const response: Pokemon = await this.makeRequest(`${BASE_POKE_API_URL}/pokemon-species/` + id + `/`) as Pokemon;
      this.assignResponseToPokemonSpecie(response);
    } catch {
      return
    }
  }

  public async requestPokemonSpecieByUrl(url: string) {
    try {
      const response: Pokemon = await this.makeRequest(url) as Pokemon;
      this.assignResponseToPokemonSpecie(response);
      this.setPokemonInArray()
    } catch {
      return
    }
  }

  public async requestPokemonEvolutionChain() {
    try {
      const response: PokemonEvolution = await this.makeRequest(this.pokemonSpecie.evolution_chain.url) as PokemonEvolution;
      this.assignResponseToPokemonEvolution(response);
    } catch {
      return
    }
  }

  private assignResponseToPokemon(response: CompletePokemon) {
    this.pokemon = response;
    this.pokemon.types.forEach(type => {
      type.type.color = `#${colors[type.type.name]}`;
    });
    this.fetchCompleted = true;
  }

  private assignResponseToPokemonSpecie(response: Pokemon) {
    this.pokemonSpecie = response;
  }

  private assignResponseToPokemonEvolution(response: PokemonEvolution) {
    this.pokemonEvolution = response;
  }
  private makeRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  private getStatsToArray() {
    let array = this.pokemon.stats.map(function (status) {
      return status.base_stat
    });
    this.pokemonStatus = array
  }

  private highestStatusInArray() {
    this.highestStatus = this.pokemonStatus.map((x) => x).sort(function (a, b) { return b - a; })[0];
  }

  public getWidghtInPercentual(pokemonStatus: number) {
    let newHighestStatus = this.highestStatus + 20
    pokemonStatus *= 100;
    let percentual = (pokemonStatus / newHighestStatus).toString() + "%";
    return percentual;
  }

  public formatPokemonAtributes(atribute: string) {
    if (atribute.length == 1) {
      atribute = "0," + atribute;
      return atribute;
    } else {
      atribute = atribute.substr(0, (atribute.length - 1)) + "," + atribute.substr((atribute.length - 1));
      return atribute;
    }
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

  public getPokemoUrl() {
    try {
      this.pokemonUrl.push(this.pokemonEvolution.chain.species.url)
      this.pokemonUrl.push(this.pokemonEvolution.chain.evolves_to[0].species.url)
      this.pokemonUrl.push(this.pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url)
    } catch {
      return
    }
  }

  public setPokemonInArray() {
    this.completePokemons.push(this.pokemonSpecie)
  }

  public async changePokemon(id: number) {
    this.completePokemons.length = 0;
    this.pokemonUrl.length = 0;
    await this.createLoading('Fetching pokemon info...');
    await this.requestPokemonFromAPI(id)
    await this.requestPokemonSpecieById(id);
    this.getStatsToArray()
    this.highestStatusInArray();
    await this.requestPokemonEvolutionChain();
    this.getPokemoUrl();
    await this.requestPokemonSpecieByUrl(this.pokemonUrl[0]);
    await this.requestPokemonSpecieByUrl(this.pokemonUrl[1]);
    await this.requestPokemonSpecieByUrl(this.pokemonUrl[2])
    this.dismissLoading();
  }

  public async ngOnInit() {
    await this.createLoading('Fetching pokemon info...');
    await this.requestPokemonFromAPI(this.pokemonByHome.pokemon_id)
    await this.requestPokemonSpecieById(this.pokemonByHome.pokemon_id);
    this.getStatsToArray()
    this.highestStatusInArray();
    await this.requestPokemonEvolutionChain();
    this.getPokemoUrl();
    await this.requestPokemonSpecieByUrl(this.pokemonUrl[0]);
    await this.requestPokemonSpecieByUrl(this.pokemonUrl[1]);
    await this.requestPokemonSpecieByUrl(this.pokemonUrl[2])
    this.dismissLoading();
  }
}


