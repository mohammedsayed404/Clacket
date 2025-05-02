import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';

@Component({
  selector: 'app-now-playing-movies',
  imports: [],
  templateUrl: './now-playing-movies.component.html',
  styleUrl: './now-playing-movies.component.css'
})
export class NowPlayingMoviesComponent implements  OnInit {

  nowPlayingMoviesList: NowPlayingMovies[];
  
  constructor(private _CategoryService: CategoryService, private _watchlistMovieService:WatchlistMovieService){
    this.nowPlayingMoviesList = [];
  }
  ngOnInit(): void {

    this._CategoryService.getNowPlayingMovis().subscribe({
      next: ({results}) => {
        this.nowPlayingMoviesList = results;
        console.log(results);
      },
      error: (err) => {
        console.log(err);
      },
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