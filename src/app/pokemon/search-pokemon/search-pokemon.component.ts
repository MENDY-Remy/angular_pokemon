import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit{

  // {...'ab'...'abz'..'ab'...'abc'...} Flux de recherche
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ){}

  ngOnInit(){
    
    this.pokemons$ = this.searchTerms.pipe(

      // {..'a'.'ab'.'abz'...'ab'...'abc'.....} initial
      debounceTime(300),
      // {...'ab'....'ab'...'abc'.....}
      distinctUntilChanged(),
      // {...'ab'.......'abc'.....}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {...pokemonList(ab).......pokemonList(abc).....}
    );
  }

  search(term: string){
    this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
