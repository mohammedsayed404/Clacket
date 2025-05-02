import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';

@Component({
  selector: 'app-popular',
  imports: [],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent implements  OnInit{

  popularMovies: NowPlayingMovies[];
  constructor(private _CategoryService:CategoryService, private _watchlistMovieService:WatchlistMovieService){
    this.popularMovies = []
  }

  ngOnInit(): void {
    this._CategoryService.getPopularMovis().subscribe({
      next: (res) => {
        this.popularMovies =  res.results;
        console.log(res.results)
      },
      error: (err) =>  {
        
        console.log(err)
      }
    })
  }

  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: (response) => {
        console.log('Movie added to watchlist:', response);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
      },
    });
  }

}
