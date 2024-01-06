import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) {}

  getPokemonDetails(url: string | null): Observable<any> {
    return this.fetchPokemonList(url).pipe(
      switchMap((result: any) => this.fetchPokemonDetails(result))
    );
  }

  fetchPokemonList(url: string | null): Observable<any> {
    return this.httpClient.get<any>(url ? url : this.baseUrl);
  }

  fetchPokemonDetails(pokemonList: any): any {
    const observables = pokemonList.results.map((pokemon: any) =>
      this.fetchIndividualPokemonDetails(pokemon.url).pipe(
        map((result: any) => ({ ...pokemon, ...result }))
      )
    );

    return forkJoin(observables).pipe(
      map((result: any) => ((pokemonList.results = result), pokemonList))
    );
  }

  fetchIndividualPokemonDetails(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }
}
