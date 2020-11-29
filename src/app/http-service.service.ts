import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompletePokemon } from 'src/interfaces/CompletePokemon';
import { Pokemon } from '../interfaces/PokemonSpecies';
import { PokemonEvolution } from '../interfaces/PokemonEvolutions';


@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private httpClient: HttpClient) { }

  public makeRequest(url: string): Promise<any> {
    return this.httpClient.get(url).toPromise();
  }

  public async requestPokemonFromAPI(url: string, id: number) {
    try {
      const response: CompletePokemon = await this.makeRequest(url + id + `/`) as CompletePokemon;
      return response;
    } catch {
      return;
    }
  }

  public async requestPokemonSpecieById(url: string, id: number) {
    try {
      const response: Pokemon = await this.makeRequest(url + id + `/`) as Pokemon;
      return response;
    } catch {
      return;
    }
  }

  public async requestPokemonSpecieByUrl(url: string) {
    try {
      const response: Pokemon = await this.makeRequest(url) as Pokemon;
      return response;
    } catch {
      return;
    }
  }

  public async requestPokemonEvolutionChain(url: string) {
    try {
      const response: PokemonEvolution = await this.makeRequest(url) as PokemonEvolution;
      return response;
    } catch {
      return;
    }
  }
}
