
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { Subscription } from 'rxjs';
import { API } from '../../../API/API';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {
  constructor(private _mockMoviesService:MockMoviesService,
    private _watchlistMovieService:WatchlistMovieService
   ) { }


tridingMovieSubscribe:Subscription= new Subscription();
WatchlistMovieSubscribe:Subscription= new Subscription();
moviesList:any[] = [];

ngOnInit():void {

  this.tridingMovieSubscribe = this._mockMoviesService.GetTrindingMovies().subscribe({
    next: ({results}) => {
      this.moviesList = results
      console.log(this.moviesList);
    },
    error: (err) => {
      console.log(err);
    },
  });

}
  addToWatchList(movieId: number): void {
    this.WatchlistMovieSubscribe = this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: (response) => {
        console.log('Movie added to watchlist:', response);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
      },
    });




  }

  ngOnDestroy(): void {
    this.tridingMovieSubscribe.unsubscribe();
    this.WatchlistMovieSubscribe.unsubscribe();
  }

}
