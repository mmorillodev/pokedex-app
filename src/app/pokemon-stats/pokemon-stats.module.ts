import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PokemonStatsPageRoutingModule } from './pokemon-stats-routing.module';

import { PokemonStatsPage } from './pokemon-stats.page';
import { ProgressBarPageModule } from '../progress-bar/progress-bar.module';
import { PokemonCardModule } from '../pokemon-card/pokemon-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonStatsPageRoutingModule,
    HttpClientModule,
    PokemonCardModule,
    ProgressBarPageModule
  ],
  declarations: [PokemonStatsPage]
})
export class PokemonStatsPageModule {}
