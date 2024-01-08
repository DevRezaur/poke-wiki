import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) {}

  getPokemonDetails(pageNo: number): Observable<any> {
    const url = `${this.baseUrl}?offset=${pageNo * 20}&limit=20`;

    return this.fetchPokemonList(url).pipe(
      switchMap((result) =>
        forkJoin(
          result.results.map((pokemon: any) =>
            this.fetchIndividualPokemonDetailsByUrl(pokemon.url)
          )
        )
      )
    );
  }

  fetchPokemonList(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  fetchIndividualPokemonDetailsByName(name: string): Observable<any> {
    const url = `${this.baseUrl}/${name}`;
    return this.fetchIndividualPokemonDetailsByUrl(url);
  }

  fetchIndividualPokemonDetailsByUrl(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }
}
