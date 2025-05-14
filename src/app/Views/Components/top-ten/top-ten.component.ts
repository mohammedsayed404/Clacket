import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMovie } from '../../../Core/models/IMovie.interface';
import { MoviesService } from '../../../Core/Services/movies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { CommonModule } from '@angular/common';
import { TmdbImageUrlPipe } from "../../../Core/pipes/tmdb-image-url.pipe";

@Component({
  selector: 'app-top-ten',
  imports: [CommonModule, RouterLink, TmdbImageUrlPipe],
  templateUrl: './top-ten.component.html',
  styleUrl: './top-ten.component.css'
})
export class TopTenComponent {

topTenByGeners: IMovie[] | undefined;
 WatchlistMovielist:number[] = [];
 categoryId: number = 0;
    constructor(
      private _mockMoviesService: MockMoviesService,
      private _watchlistMovieService: WatchlistMovieService,
      private _toastr: ToastrService,
      private _activatedRoute: ActivatedRoute
    ) {}
  ngOnInit(): void {
        this.categoryId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
        console.log(this.categoryId);
        this.getTopTenByGeners(this.categoryId);
        this.refreshWatchlistData();
  }



getTopTenByGeners(categoryNumber:number):void{
  this._mockMoviesService.GetTopTenByGeners(categoryNumber).subscribe({
    next: ({ results }) => {
      this.topTenByGeners = results;
      console.log('top 10  Movies:', this.topTenByGeners);
    },
  });
}

refreshWatchlistData():void{
    this._watchlistMovieService.getClacketWatchlist().subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        console.log(movieIds);
       }

  });

  this._watchlistMovieService.watchlist$.subscribe({
    next: (movieIds) => this.WatchlistMovielist = movieIds,
  });

}
  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        this._watchlistMovieService.updateWatchlistData(movieIds);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
        this._toastr.success(" added sussufully ")
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }


  RemoveFromWatchlist(movieId: number): void {

    this._watchlistMovieService.RemoveFromWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        this._watchlistMovieService.updateWatchlistData(movieIds);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value - 1);
        this._toastr.success("movie removed sussufully");

      },
      error: (err) => {
        this._toastr.error(err);
      },
    });

}


}
