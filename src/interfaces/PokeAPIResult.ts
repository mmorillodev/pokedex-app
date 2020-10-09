export interface PokeAPIResult {
    count: number;
    next: string;
    previous: string;
    results: SimplePokemon[];
}

export interface SimplePokemon {
    name: string;
    url: string;
}
