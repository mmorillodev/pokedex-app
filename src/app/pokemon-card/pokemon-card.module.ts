import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PokemonCardComponent } from './pokemon-card.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule
  ],
  declarations: [PokemonCardComponent],
  exports: [PokemonCardComponent]
})
export class PokemonCardModule {}
