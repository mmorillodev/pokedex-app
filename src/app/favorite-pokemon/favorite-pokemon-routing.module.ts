import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritePokemonPage } from './favorite-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritePokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritePokemonPageRoutingModule {}
