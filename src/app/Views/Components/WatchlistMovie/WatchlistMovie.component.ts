import { Component, OnDestroy, OnInit } from '@angular/core';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-WatchlistMovie',
  templateUrl: './WatchlistMovie.component.html',
  styleUrls: ['./WatchlistMovie.component.css']
})
export class WatchlistMovieComponent implements OnInit , OnDestroy {

WatchlistMovieSubscribe:Subscription= new Subscription();
WatchlistMovielist:any[] = [];

constructor(private _watchlistMovieService:WatchlistMovieService, private _toastr: ToastrService) { }


  ngOnInit(): void {

  this.WatchlistMovieSubscribe =  this._watchlistMovieService.GetWatchlist().subscribe({
      next: ({results}) => {
        this.WatchlistMovielist = results;
        console.log(results);
      },
      error: (err) => {
        console.log(err);
      },
    });


  }


  RemoveFromWatchlist(movieId: number): void {

    this._watchlistMovieService.RemoveFromWatchlist(movieId).subscribe({
      next: (response) => {
        console.log('Movie removed from watchlist:', response);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value - 1);
        this.WatchlistMovielist = this.WatchlistMovielist.filter(movie => movie.id !== movieId);
        this._toastr.success(response.status_message, "Clacket")

      },
      error: (err) => {
        console.error('Error removing movie from watchlist:', err);
        this._toastr.error(err.status_message, "Clacket")

      },
    });

}


ngOnDestroy(): void {
  this.WatchlistMovieSubscribe.unsubscribe();
}


}
