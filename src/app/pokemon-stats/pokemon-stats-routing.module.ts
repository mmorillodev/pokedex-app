import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonStatsPage } from './pokemon-stats.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonStatsPageRoutingModule {}
