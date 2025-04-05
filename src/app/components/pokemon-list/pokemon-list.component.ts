import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  standalone: false,
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  currentPageNo: number = 0;
  pokemonList: any[] = [];

  constructor(
    private pokeApiService: PokeApiService,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      if (params.has('pokemon')) {
        const pokemonName = params.get('pokemon');
        this.loadSinglePokemonDetails(pokemonName);
      } else {
        this.currentPageNo = params.get('page') ?? 0;
        this.loadAllPokemonDetails();
      }
    });
  }

  loadSinglePokemonDetails(name: string) {
    this.pokeApiService.fetchIndividualPokemonDetailsByName(name).subscribe({
      next: (result) => {
        this.pokemonList.splice(0, this.pokemonList.length, result);
      },
      error: (error) => {
        this.pokemonList = [];
      },
    });
  }

  loadAllPokemonDetails(): void {
    this.pokeApiService
      .fetchPokemonListWithDetails(this.currentPageNo)
      .subscribe((result) => (this.pokemonList = result));
  }

  loadPreviousPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: { page: --this.currentPageNo },
    });
  }

  loadNextPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: { page: ++this.currentPageNo },
    });
  }

  viewPokemonDetails(pokemon: any): void {
    this.sharedDataService.saveData(pokemon);
    this.router.navigate(['/pokemon-details']);
  }
}
