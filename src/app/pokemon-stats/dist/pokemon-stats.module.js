"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PokemonStatsPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var pokemon_card_module_1 = require("../pokemon-card/pokemon-card.module");
var angular_1 = require("@ionic/angular");
var pokemon_stats_routing_module_1 = require("./pokemon-stats-routing.module");
var pokemon_stats_page_1 = require("./pokemon-stats.page");
var PokemonStatsPageModule = /** @class */ (function () {
    function PokemonStatsPageModule() {
    }
    PokemonStatsPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                pokemon_stats_routing_module_1.PokemonStatsPageRoutingModule,
                http_1.HttpClientModule,
                pokemon_card_module_1.PokemonCardModule
            ],
            declarations: [pokemon_stats_page_1.PokemonStatsPage]
        })
    ], PokemonStatsPageModule);
    return PokemonStatsPageModule;
}());
exports.PokemonStatsPageModule = PokemonStatsPageModule;
