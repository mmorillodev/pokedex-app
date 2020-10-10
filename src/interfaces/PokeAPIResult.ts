import { CompletePokemon } from "./CompletePokemon";

export interface PokeAPIResult {
    count: number;
    next: string;
    previous: string;
    results: PokeAPIPokemon[];
}

export interface PokeAPIPokemon {
    name: string;
    url: string;
    additionalInfo?: CompletePokemon;
}
