import { Component, OnDestroy, OnInit } from '@angular/core';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IMovie } from '../../../Core/models/IMovie.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MoviesService } from '../../../Core/Services/movies.service';

@Component({
  selector: 'app-watchlistmovie',
  templateUrl: './WatchlistMovie.component.html',
  imports: [CommonModule,RouterLink],
  styleUrls: ['./WatchlistMovie.component.css']
})
export class WatchlistMovieComponent implements OnInit , OnDestroy {

WatchlistMovieSubscribe:Subscription= new Subscription();
WatchlistMovielist:IMovie[] = [];

constructor(private _watchlistMovieService:WatchlistMovieService, private _toastr: ToastrService,
  private _MoviesService:MoviesService
) { }


  ngOnInit(): void {

  this.WatchlistMovieSubscribe =  this._watchlistMovieService.getClacketWatchlist().subscribe({
      next: ({movieIds}) => {

         for (let index = 0; index < movieIds.length; index++) {
              const movieId = movieIds[index];

               this._watchlistMovieService.GetWatchlist(movieId).subscribe({
                next: movie => this.WatchlistMovielist.push(movie),

               })

         }
       }

  });




  }


  RemoveFromWatchlist(movieId: number): void {

    this._watchlistMovieService.RemoveFromWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        console.log('Movie removed from watchlist:', movieIds);
        //i will look at  it again
        this._watchlistMovieService.updateWatchlistData(movieIds);
        this.WatchlistMovielist = this.WatchlistMovielist.filter(movie => movie.id !== movieId);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value > 0 ? this._watchlistMovieService.total_results.value - 1 : 0);
        this._toastr.success( "Movie removed sussufully ")

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
