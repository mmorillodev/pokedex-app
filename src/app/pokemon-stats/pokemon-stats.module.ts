import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCardModule } from '../pokemon-card/pokemon-card.module';

import { IonicModule } from '@ionic/angular';

import { PokemonStatsPageRoutingModule } from './pokemon-stats-routing.module';

import { PokemonStatsPage } from './pokemon-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonStatsPageRoutingModule,
    HttpClientModule,
    PokemonCardModule
  ],
  declarations: [PokemonStatsPage]
})
export class PokemonStatsPageModule {}
