"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoritePokemonPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var angular_1 = require("@ionic/angular");
var favorite_pokemon_routing_module_1 = require("./favorite-pokemon-routing.module");
var pokemon_card_module_1 = require("../pokemon-card/pokemon-card.module");
var favorite_pokemon_page_1 = require("./favorite-pokemon.page");
var FavoritePokemonPageModule = /** @class */ (function () {
    function FavoritePokemonPageModule() {
    }
    FavoritePokemonPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                favorite_pokemon_routing_module_1.FavoritePokemonPageRoutingModule,
                pokemon_card_module_1.PokemonCardModule,
                http_1.HttpClientModule
            ],
            declarations: [favorite_pokemon_page_1.FavoritePokemonPage]
        })
    ], FavoritePokemonPageModule);
    return FavoritePokemonPageModule;
}());
exports.FavoritePokemonPageModule = FavoritePokemonPageModule;
