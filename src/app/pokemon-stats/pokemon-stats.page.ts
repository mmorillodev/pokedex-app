import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import colors from '../../resources/colors';

import { BASE_POKE_API_URL } from '../../resources/strings';
import { Pokemon } from '../../interfaces/PokemonSpecies';
import { PokemonEvolution } from '../../interfaces/PokemonEvolutions';
import { CompletePokemon } from 'src/interfaces/CompletePokemon';
import { OfflineStorageService } from 'src/app/offline_storage.service';
import { HTTPService } from "../http-service.service";
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.page.html',
  styleUrls: ['./pokemon-stats.page.scss'],
})
export class PokemonStatsPage implements OnInit {

  public favorite: boolean = false;
  public loading = true;
  public fetchCompleted = false;
  public error: boolean = false;
  public pokemonByHome: any;
  public pokemonStatus: number[] = []
  public widthProgressBar: string[] = []
  public pokemonUrl: string[] = []

  public pokemon: CompletePokemon;
  public pokemonSpecie: Pokemon;
  public pokemonEvolution: PokemonEvolution;
  public completePokemons: any[] = [];

  constructor(public modalController: ModalController, private alertController: AlertController, private httpService: HTTPService, private offlineStorage: OfflineStorageService, private route: ActivatedRoute, private router: Router, private loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.pokemonByHome = getNav.extras.state.valueToSend;
      }
    });
  }

  public async assignResponseToPokemon(id: number) {
    const response = await this.httpService.requestPokemonFromAPI(`${BASE_POKE_API_URL}/pokemon/`, id)
    this.pokemon = response;
    this.pokemon.types.forEach(type => {
      type.type.color = `#${colors[type.type.name]}`;
    });
    this.fetchCompleted = true;
  }

  public async assignPokemonSpecieById(id: number) {
    const response = await this.httpService.requestPokemonSpecieById(`${BASE_POKE_API_URL}/pokemon-species/`, id)
    this.pokemonSpecie = response;
  }

  public async assignPokemonSpecieByUrl(url: string) {
    const response = await this.httpService.requestPokemonSpecieByUrl(url)
    this.completePokemons.push(response)
  }

  public async assignEvolutionChain() {
    const response = await this.httpService.requestPokemonEvolutionChain(this.pokemonSpecie.evolution_chain.url)
    this.pokemonEvolution = response;
  }

  private getStatsToArray() {
    let array = this.pokemon.stats.map(function (status) {
      return status.base_stat
    });
    this.pokemonStatus = array
  }

  private highestStatusInArray() {
    return this.pokemonStatus.map((x) => x).sort(function (a, b) { return b - a; })[0];
  }

  public getWidghtInPercentual() {
    for (let status of this.pokemon.stats) {
      let stat = status.base_stat * 100
      let percentual = (stat / (this.highestStatusInArray() + 20)).toString() + "%";
      this.widthProgressBar.push(percentual)
    }
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
    } catch (e) {
      return
    }
  }

  public setPokemonInArray(response: Pokemon) {
    this.completePokemons.push(response)
  }

  public setFavorite() {
    if (this.favorite == false) {
      this.favorite = true;
      this.offlineStorage.setStorage(this.pokemon, this.pokemon.name)
    } else {
      this.favorite = false;
      this.offlineStorage.deleteStorage(this.pokemon.name)
    }
  }

  public async verifyFavorite() {
    if (await this.offlineStorage.checkKey(this.pokemon.name) == false) {
      this.favorite = false;
    } else {
      this.favorite = true;
    }
  }

  public swipePokemon(value: number) {
    let pokeId = this.pokemon.id + value;

    if (pokeId == 0) {
      this.presentAlertConfirm('The only Pokemon on this side is MissingNo', 'Gotcha!')
    } else if (pokeId == 894) {
      this.presentAlertConfirm('The only Pokemon on this side is MissingNo', 'Gotcha!')
    }
    else {
      this.changePokemon(pokeId)
    }
  }

  public async onSwipe(event) {
    const x =
      Math.abs(
        event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";

    if (x == 'Right') {
      this.swipePokemon(-1)
    } else if (x == 'Left') {
      this.swipePokemon(+1)
    }
  }

  async presentAlertConfirm(message: string, text: string) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: message,
      buttons: [
        {
          text: text,
        }
      ]
    });

    await alert.present();
  }

  public async openModal() {
    if (this.pokemonByHome.pokemon_id <= 894) {
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          'pokemon': this.pokemon,
          'pokemonSpecie': this.pokemonSpecie
        }
      });

      return await modal.present();
    } else {
      this.presentAlertConfirm('This Pokemon has any advanced Info. Sorry :(', 'Ok!')
    }
  }

  private async iterateUrlPokemon() {
    for (let url of this.pokemonUrl) {
      await this.assignPokemonSpecieByUrl(url)
    }
  }

  private resetVariable() {
    this.completePokemons.length = 0;
    this.pokemonUrl.length = 0;
    this.fetchCompleted = false;
    this.favorite = false;
    this.widthProgressBar.length = 0
  }

  public async changePokemon(id: number) {
    this.resetVariable()
    try {
      await this.createLoading('Fetching pokemon info...');
      await this.assignResponseToPokemon(id)
      this.getStatsToArray()
      this.highestStatusInArray();
      this.getWidghtInPercentual()
      if (this.pokemon.id < 894) {
        await this.assignPokemonSpecieById(id);
      await this.assignEvolutionChain();
      this.getPokemoUrl();
      await this.iterateUrlPokemon()
      }
      this.verifyFavorite();
      this.dismissLoading();
    } catch {
      this.error = true;
      this.dismissLoading();
      await this.presentAlertConfirm('There was an error performing this action. Sorry :(', 'Ok')
    }
  }

  public async ngOnInit() {
    try {
      await this.createLoading('Fetching pokemon info...');
      await this.assignResponseToPokemon(this.pokemonByHome.pokemon_id)
      this.getStatsToArray()
      this.highestStatusInArray();
      this.getWidghtInPercentual()
      if (this.pokemon.id < 894) {
        await this.assignPokemonSpecieById(this.pokemonByHome.pokemon_id);
      await this.assignEvolutionChain();
      this.getPokemoUrl();
      await this.iterateUrlPokemon()
      }
      this.verifyFavorite();
      this.dismissLoading();
    } catch {
      this.error = true;
      this.dismissLoading();
      await this.presentAlertConfirm('There was an error performing this action. Sorry :(', 'Ok')
    }
  }
}


