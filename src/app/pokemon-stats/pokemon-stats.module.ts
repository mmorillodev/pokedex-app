import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonStatsPageRoutingModule } from './pokemon-stats-routing.module';

import { PokemonStatsPage } from './pokemon-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonStatsPageRoutingModule
  ],
  declarations: [PokemonStatsPage]
})
export class PokemonStatsPageModule {}
