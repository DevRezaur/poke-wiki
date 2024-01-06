import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonDetails: any;

  constructor(private pokeApiService: PokeApiService) {
    this.pokemonDetails = {};
  }

  ngOnInit(): void {
    // this.pokeApiService.getPokemonDetails(null).subscribe({
    //   next: (result: any) => {
    //     this.pokemonDetails = result;
    //     console.log(this.pokemonDetails);
    //   },
    //   error: (error: any) => console.error(error),
    // });
  }
}
