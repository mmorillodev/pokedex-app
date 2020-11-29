import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Types } from '../../interfaces/Types';
import { BASE_POKE_API_URL } from '../../resources/strings';
import { LoadingController } from '@ionic/angular';
import colors from '../../resources/colors';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() public pokemon;
  @Input() public pokemonSpecie;

  private highestStatus: number;
  public pokemonStatus: number[] = []
  public types: Types[] = [];
  public typesPokemon: string[] = []
  public fetchCompleted = false;
  public loading = true;
  public doubleDamage: string[] = []
  public halfDamage: string[] = []
  public genderM: string;
  public genderF: string;

  constructor(private modalController: ModalController, private httpClient: HttpClient, private loadingController: LoadingController) { }

  private makeRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  public async requestTypeFromAPI() {
    try {
      for (let type of this.typesPokemon) {
        const response: Types = await this.makeRequest(`${BASE_POKE_API_URL}/type/` + type + `/`) as Types;
        this.assignType(response)
      }
    } catch {
      return
    }
    this.typesPokemon.length = 0
  }

  public assignType(response: Types) {
    this.types.push(response)
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

  public async closeModal() {
    await this.modalController.dismiss();
  }

  public getColor(type: string) {
    return "#" + colors[type]
  }

  private getTypes() {
    for (let type of this.pokemon.types) {
      this.typesPokemon.push(type.type.name)
    }
  }

  private doubleDamageArray() {
    for (let type of this.types) {
      for (let tipos of type.damage_relations.double_damage_from) {
        this.typesPokemon.push(tipos.name)
      }
    }
    for (let i = 0; i < this.pokemon.types.length; i++) {
      if (this.typesPokemon[i] == this.pokemon.types[i].type.name) {
        this.typesPokemon.splice(i, 1)
      }
    }
  }

  private halfDamageArray() {
    for (let type of this.types) {
      for (let tipos of type.damage_relations.half_damage_from) {
        this.halfDamage.push(tipos.name)
      }
    }
    this.halfDamage = this.halfDamage.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    for (let i = 0; i < this.halfDamage.length; i++) {
      for (let j = 0; j < this.typesPokemon.length; j++) {
        if (this.halfDamage[i] == this.typesPokemon[j]) {
          this.halfDamage.splice(i, 1)
        }
      }
    }

    if (this.pokemon.types.length > 1) {
      for (let i = 0; i < this.halfDamage.length; i++) {
        if (this.halfDamage[i] == this.pokemon.types[this.pokemon.types.length - 1].type.name) {
          let a = this.halfDamage.splice(this.halfDamage.indexOf(this.pokemon.types[this.pokemon.types.length - 1].type.name), 1)
          console.log(a)
        }
      }
    }
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

  public formatGenderRatio() {
    if (this.pokemonSpecie.gender_rate != -1) {
      let gender = 0.125 * (this.pokemonSpecie.gender_rate * 100);
      this.genderF = gender.toString() + '%'
      gender = 100 - gender
      this.genderM = gender.toString() + '%'
    } else {
      this.genderF = this.genderM = null;
    }
  }

  async ngOnInit() {
    await this.createLoading('Fetching pokemon info...')
    this.getTypes()
    await this.requestTypeFromAPI()
    this.getStatsToArray()
    this.highestStatusInArray();
    this.fetchCompleted = true;
    this.doubleDamageArray()
    this.halfDamageArray()
    this.formatGenderRatio()
    this.dismissLoading()
  }

}
