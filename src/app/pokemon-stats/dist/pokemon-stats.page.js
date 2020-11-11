"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PokemonStatsPage = void 0;
var core_1 = require("@angular/core");
var colors_1 = require("../../resources/colors");
var strings_1 = require("../../resources/strings");
var PokemonStatsPage = /** @class */ (function () {
    function PokemonStatsPage(alertController, offlineStorage, route, router, httpClient, loadingController) {
        var _this = this;
        this.alertController = alertController;
        this.offlineStorage = offlineStorage;
        this.route = route;
        this.router = router;
        this.httpClient = httpClient;
        this.loadingController = loadingController;
        this.pokemon_id = 1;
        this.check = false;
        this.favorite = false;
        this.loading = true;
        this.fetchCompleted = false;
        this.pokemonStatus = [];
        this.pokemonUrl = [];
        this.completePokemons = [];
        this.route.queryParams.subscribe(function (params) {
            var getNav = _this.router.getCurrentNavigation();
            if (getNav.extras.state) {
                _this.pokemonByHome = getNav.extras.state.valueToSend;
            }
        });
    }
    PokemonStatsPage.prototype.requestPokemonFromAPI = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest(strings_1.BASE_POKE_API_URL + "/pokemon/" + id + "/")];
                    case 1:
                        response = _b.sent();
                        this.assignResponseToPokemon(response);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.requestPokemonSpecieById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest(strings_1.BASE_POKE_API_URL + "/pokemon-species/" + id + "/")];
                    case 1:
                        response = _b.sent();
                        this.assignResponseToPokemonSpecie(response);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.requestPokemonSpecieByUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest(url)];
                    case 1:
                        response = _b.sent();
                        this.assignResponseToPokemonSpecie(response);
                        this.setPokemonInArray();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.requestPokemonEvolutionChain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.makeRequest(this.pokemonSpecie.evolution_chain.url)];
                    case 1:
                        response = _b.sent();
                        this.assignResponseToPokemonEvolution(response);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.assignResponseToPokemon = function (response) {
        this.pokemon = response;
        this.pokemoninPage = response;
        this.pokemon_id = response.id;
        this.pokemon.types.forEach(function (type) {
            type.type.color = "#" + colors_1["default"][type.type.name];
        });
        this.fetchCompleted = true;
    };
    PokemonStatsPage.prototype.assignResponseToPokemonSpecie = function (response) {
        this.pokemonSpecie = response;
        if (this.check == false) {
            this.check = true;
        }
    };
    PokemonStatsPage.prototype.assignResponseToPokemonEvolution = function (response) {
        this.pokemonEvolution = response;
    };
    PokemonStatsPage.prototype.makeRequest = function (url) {
        return this.httpClient.get(url).toPromise();
    };
    PokemonStatsPage.prototype.getStatsToArray = function () {
        var array = this.pokemon.stats.map(function (status) {
            return status.base_stat;
        });
        this.pokemonStatus = array;
    };
    PokemonStatsPage.prototype.highestStatusInArray = function () {
        this.highestStatus = this.pokemonStatus.map(function (x) { return x; }).sort(function (a, b) { return b - a; })[0];
    };
    PokemonStatsPage.prototype.getWidghtInPercentual = function (pokemonStatus) {
        var newHighestStatus = this.highestStatus + 20;
        pokemonStatus *= 100;
        var percentual = (pokemonStatus / newHighestStatus).toString() + "%";
        return percentual;
    };
    PokemonStatsPage.prototype.formatPokemonAtributes = function (atribute) {
        if (atribute.length == 1) {
            atribute = "0," + atribute;
            return atribute;
        }
        else {
            atribute = atribute.substr(0, (atribute.length - 1)) + "," + atribute.substr((atribute.length - 1));
            return atribute;
        }
    };
    PokemonStatsPage.prototype.createLoading = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        return [4 /*yield*/, this.loadingController.create({
                                message: message
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PokemonStatsPage.prototype.dismissLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = false;
                        return [4 /*yield*/, this.loadingController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.getPokemoUrl = function () {
        try {
            this.pokemonUrl.push(this.pokemonEvolution.chain.species.url);
            this.pokemonUrl.push(this.pokemonEvolution.chain.evolves_to[0].species.url);
            this.pokemonUrl.push(this.pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url);
        }
        catch (_a) {
            return;
        }
    };
    PokemonStatsPage.prototype.setPokemonInArray = function () {
        this.completePokemons.push(this.pokemonSpecie);
    };
    PokemonStatsPage.prototype.setFavorite = function () {
        if (this.favorite == false) {
            this.favorite = true;
            this.offlineStorage.setStorage(this.pokemoninPage, this.pokemon.name);
        }
        else {
            this.favorite = false;
            this.offlineStorage.deleteStorage(this.pokemon.name);
        }
    };
    PokemonStatsPage.prototype.verifyFavorite = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.offlineStorage.checkKey(this.pokemon.name)];
                    case 1:
                        if ((_a.sent()) == false) {
                            this.favorite = false;
                        }
                        else {
                            this.favorite = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.swipePokemon = function (value) {
        this.pokemon_id += value;
        if (this.pokemon_id == 0 || this.pokemon_id == 1051) {
            this.pokemon_id = 1;
            this.presentAlertConfirm();
        }
        else {
            this.changePokemon(this.pokemon_id);
        }
    };
    PokemonStatsPage.prototype.onSwipe = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
                if (x == 'Right') {
                    this.swipePokemon(-1);
                }
                else if (x == 'Left') {
                    this.swipePokemon(+1);
                }
                return [2 /*return*/];
            });
        });
    };
    PokemonStatsPage.prototype.presentAlertConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Oops!',
                            message: 'O único Pokemon presente para este lado é o MissingNo',
                            buttons: [
                                {
                                    text: 'Gotcha!',
                                    handler: function () {
                                        console.log('');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.changePokemon = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.completePokemons.length = 0;
                        this.pokemonUrl.length = 0;
                        return [4 /*yield*/, this.createLoading('Fetching pokemon info...')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonFromAPI(id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonSpecieById(id)];
                    case 3:
                        _a.sent();
                        this.getStatsToArray();
                        this.highestStatusInArray();
                        return [4 /*yield*/, this.requestPokemonEvolutionChain()];
                    case 4:
                        _a.sent();
                        this.getPokemoUrl();
                        return [4 /*yield*/, this.requestPokemonSpecieByUrl(this.pokemonUrl[0])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonSpecieByUrl(this.pokemonUrl[1])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonSpecieByUrl(this.pokemonUrl[2])];
                    case 7:
                        _a.sent();
                        this.verifyFavorite();
                        this.dismissLoading();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createLoading('Fetching pokemon info...')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonFromAPI(this.pokemonByHome.pokemon_id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonSpecieById(this.pokemonByHome.pokemon_id)];
                    case 3:
                        _a.sent();
                        this.getStatsToArray();
                        this.highestStatusInArray();
                        return [4 /*yield*/, this.requestPokemonEvolutionChain()];
                    case 4:
                        _a.sent();
                        this.getPokemoUrl();
                        return [4 /*yield*/, this.requestPokemonSpecieByUrl(this.pokemonUrl[0])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonSpecieByUrl(this.pokemonUrl[1])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.requestPokemonSpecieByUrl(this.pokemonUrl[2])];
                    case 7:
                        _a.sent();
                        this.verifyFavorite();
                        this.dismissLoading();
                        return [2 /*return*/];
                }
            });
        });
    };
    PokemonStatsPage = __decorate([
        core_1.Component({
            selector: 'app-pokemon-stats',
            templateUrl: './pokemon-stats.page.html',
            styleUrls: ['./pokemon-stats.page.scss']
        })
    ], PokemonStatsPage);
    return PokemonStatsPage;
}());
exports.PokemonStatsPage = PokemonStatsPage;
