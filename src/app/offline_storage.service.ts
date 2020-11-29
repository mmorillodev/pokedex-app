import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class OfflineStorageService {

  public listOfPokemons = [];

  constructor(private storage: Storage) { }

  public setStorage(pokemon: any, key: any) {
    this.storage.set(key, pokemon)
  }

  public getStorage(key: string) {
    let pokemon = this.storage.get(key).then((data) => {
      return data
    });
    return pokemon;
  }

  public async checkKey(key: string) {
    let check: boolean;
    await this.storage.get(key).then((data) => {
      if (data == null) {
        check = false
      } else {
        check = true;
      }
    });
    return check;
  }

  public getAllFavorites() {
    this.listOfPokemons.length = 0;
    new Promise((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        this.listOfPokemons.push(value);
      }).then((d) => {
        resolve(this.listOfPokemons);
      });
    });
    return this.listOfPokemons
  }

  public async getLenght() {
    this.storage.length().then((data) => {
      console.log(data);
    })
  }

  public deleteStorage(key: string) {
    this.storage.remove(key)
  }

  public clear() {
    this.storage.clear()
  }
}
