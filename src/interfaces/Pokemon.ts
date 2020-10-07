export interface Pokemon {
    abilities: PokemonAbility[];
    sprites: Sprites;
    types: Type[];
}

interface PokemonAbility {

}

interface Sprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: object;
}

interface Type {
    type: TypeCompl;
}

interface TypeCompl {
    name: string;
    color: string;
}