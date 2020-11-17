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
exports.ModalPage = void 0;
var core_1 = require("@angular/core");
var strings_1 = require("../../resources/strings");
var colors_1 = require("../../resources/colors");
var ModalPage = /** @class */ (function () {
    function ModalPage(modalController, httpClient, loadingController) {
        this.modalController = modalController;
        this.httpClient = httpClient;
        this.loadingController = loadingController;
        this.pokemonStatus = [];
        this.types = [];
        this.typesPokemon = [];
        this.fetchCompleted = false;
        this.loading = true;
        this.doubleDamage = [];
        this.halfDamage = [];
    }
    ModalPage.prototype.makeRequest = function (url) {
        return this.httpClient.get(url).toPromise();
    };
    ModalPage.prototype.requestTypeFromAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, type, response, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _i = 0, _a = this.typesPokemon;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        type = _a[_i];
                        return [4 /*yield*/, this.makeRequest(strings_1.BASE_POKE_API_URL + "/type/" + type + "/")];
                    case 2:
                        response = _c.sent();
                        this.assignType(response);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        _b = _c.sent();
                        return [2 /*return*/];
                    case 6:
                        this.typesPokemon.length = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage.prototype.assignType = function (response) {
        this.types.push(response);
    };
    ModalPage.prototype.createLoading = function (message) {
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
    ModalPage.prototype.dismissLoading = function () {
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
    ModalPage.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage.prototype.getColor = function (type) {
        return "#" + colors_1["default"][type];
    };
    ModalPage.prototype.getTypes = function () {
        for (var _i = 0, _a = this.pokemon.types; _i < _a.length; _i++) {
            var type = _a[_i];
            this.typesPokemon.push(type.type.name);
        }
    };
    ModalPage.prototype.doubleDamageArray = function () {
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var type = _a[_i];
            for (var _b = 0, _c = type.damage_relations.double_damage_from; _b < _c.length; _b++) {
                var tipos = _c[_b];
                this.typesPokemon.push(tipos.name);
            }
        }
        for (var i = 0; i < this.pokemon.types.length; i++) {
            if (this.typesPokemon[i] == this.pokemon.types[i].type.name) {
                this.typesPokemon.splice(i, 1);
            }
        }
    };
    ModalPage.prototype.halfDamageArray = function () {
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var type = _a[_i];
            for (var _b = 0, _c = type.damage_relations.half_damage_from; _b < _c.length; _b++) {
                var tipos = _c[_b];
                this.halfDamage.push(tipos.name);
            }
        }
        this.halfDamage = this.halfDamage.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        for (var i = 0; i < this.halfDamage.length; i++) {
            for (var j = 0; j < this.typesPokemon.length; j++) {
                if (this.halfDamage[i] == this.typesPokemon[j]) {
                    this.halfDamage.splice(i, 1);
                }
            }
        }
        if (this.pokemon.types.length > 1) {
            for (var i = 0; i < this.halfDamage.length; i++) {
                if (this.halfDamage[i] == this.pokemon.types[this.pokemon.types.length - 1].type.name) {
                    var a = this.halfDamage.splice(this.halfDamage.indexOf(this.pokemon.types[this.pokemon.types.length - 1].type.name), 1);
                    console.log(a);
                }
            }
        }
    };
    ModalPage.prototype.getStatsToArray = function () {
        var array = this.pokemon.stats.map(function (status) {
            return status.base_stat;
        });
        this.pokemonStatus = array;
    };
    ModalPage.prototype.highestStatusInArray = function () {
        this.highestStatus = this.pokemonStatus.map(function (x) { return x; }).sort(function (a, b) { return b - a; })[0];
    };
    ModalPage.prototype.getWidghtInPercentual = function (pokemonStatus) {
        var newHighestStatus = this.highestStatus + 20;
        pokemonStatus *= 100;
        var percentual = (pokemonStatus / newHighestStatus).toString() + "%";
        return percentual;
    };
    ModalPage.prototype.formatPokemonAtributes = function (atribute) {
        if (atribute.length == 1) {
            atribute = "0," + atribute;
            return atribute;
        }
        else {
            atribute = atribute.substr(0, (atribute.length - 1)) + "," + atribute.substr((atribute.length - 1));
            return atribute;
        }
    };
    ModalPage.prototype.formatGenderRatio = function () {
        if (this.pokemonSpecie.gender_rate != -1) {
            var gender = 0.125 * (this.pokemonSpecie.gender_rate * 100);
            this.genderF = gender.toString() + '%';
            gender = 100 - gender;
            this.genderM = gender.toString() + '%';
        }
        else {
            this.genderF = this.genderM = null;
        }
    };
    ModalPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createLoading('Fetching pokemon info...')];
                    case 1:
                        _a.sent();
                        this.getTypes();
                        return [4 /*yield*/, this.requestTypeFromAPI()];
                    case 2:
                        _a.sent();
                        this.getStatsToArray();
                        this.highestStatusInArray();
                        this.fetchCompleted = true;
                        this.doubleDamageArray();
                        this.halfDamageArray();
                        this.formatGenderRatio();
                        this.dismissLoading();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], ModalPage.prototype, "pokemon");
    __decorate([
        core_1.Input()
    ], ModalPage.prototype, "pokemonSpecie");
    ModalPage = __decorate([
        core_1.Component({
            selector: 'app-modal',
            templateUrl: './modal.page.html',
            styleUrls: ['./modal.page.scss']
        })
    ], ModalPage);
    return ModalPage;
}());
exports.ModalPage = ModalPage;
