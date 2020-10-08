import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCardGridComponent } from './pokemon-card-grid.component';

import { PokemonCardModule } from '../pokemon-card/pokemon-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PokemonCardModule,
    IonicModule,
  ],
  declarations: [PokemonCardGridComponent],
  exports: [PokemonCardGridComponent]
})
export class PokemonCardGridComponentModule {}
