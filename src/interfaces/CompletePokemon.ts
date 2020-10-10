export interface CompletePokemon {
    id: number;
    abilities: PokemonAbility[];
    sprites: Sprites;
    types: Type[];
}

// tslint:disable-next-line: no-empty-interface
interface PokemonAbility { }

export interface Sprites {
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

export interface Type {
    type: TypeCompl;
}

export interface TypeCompl {
    name: string;
    color: string;
}
