
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { Subscription } from 'rxjs';
import { API } from '../../../API/API';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ScrollTopComponent]
})
export class HomeComponent implements OnInit , OnDestroy {
  constructor(private _mockMoviesService:MockMoviesService,
    private _watchlistMovieService:WatchlistMovieService,
    private _toastr: ToastrService
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
        this._toastr.success(response.status_message, "Clacket")

      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
      this._toastr.error(err.status_message, "Clacket")

      },
    });




  }

  ngOnDestroy(): void {
    this.tridingMovieSubscribe.unsubscribe();
    this.WatchlistMovieSubscribe.unsubscribe();
  }

}
