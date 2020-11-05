import { Component, OnInit } from '@angular/core';

import { OfflineStorageService } from 'src/app/offline_storage.service'

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.page.html',
  styleUrls: ['./favorite-pokemon.page.scss'],
})
export class FavoritePokemonPage implements OnInit {

  public completePokemon: any[] = []

  constructor(private offlineStorage: OfflineStorageService) { }

  public  getPokemonInStorage() {
    this.completePokemon = this.offlineStorage.getAllFavorites()
  }

  public deleteAll(){
    this.completePokemon.length = 0
    this.offlineStorage.clear()
  }

  async ngOnInit() {
    this.getPokemonInStorage()
  }

}
