import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  currentPageNo: number;
  pokemonDetails: any;

  constructor(
    private pokeApiService: PokeApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentPageNo = 0;
    this.pokemonDetails = [];
  }

  ngOnInit(): void {
    this.setCurrentPageNo();
    this.loadPokemonDetails();
  }

  setCurrentPageNo(): void {
    this.currentPageNo = this.route.snapshot.queryParams['page'] || 0;
  }

  loadPokemonDetails(): void {
    this.pokeApiService.getPokemonDetails(this.currentPageNo).subscribe({
      next: (result) => (this.pokemonDetails = result),
      error: (error) => console.error(error),
    });
  }

  loadPreviousPage(): void {
    this.router
      .navigate(['/pokemon-list'], {
        queryParams: { page: --this.currentPageNo },
      })
      .finally(() => this.loadPokemonDetails());
  }

  loadNextPage(): void {
    this.router
      .navigate(['/pokemon-list'], {
        queryParams: { page: ++this.currentPageNo },
      })
      .finally(() => this.loadPokemonDetails());
  }
}
