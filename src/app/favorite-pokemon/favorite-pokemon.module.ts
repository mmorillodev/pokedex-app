import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { FavoritePokemonPageRoutingModule } from './favorite-pokemon-routing.module';
import { PokemonCardModule } from '../pokemon-card/pokemon-card.module';

import { FavoritePokemonPage } from './favorite-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePokemonPageRoutingModule,
    PokemonCardModule,
    HttpClientModule
  ],
  declarations: [FavoritePokemonPage]
})
export class FavoritePokemonPageModule {}
