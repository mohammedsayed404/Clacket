import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../Core/Services/movies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { IMovie } from '../../../Core/models/IMovie.interface';
import { Movie } from '../../../Core/Interfaces/Movie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbImageUrlPipe } from "../../../Core/pipes/tmdb-image-url.pipe";

@Component({
  selector: 'app-movie-category',
  imports: [CommonModule, RouterLink, TmdbImageUrlPipe],
  templateUrl: './movie-category.component.html',
  styleUrl: './movie-category.component.css'
})
export class MovieCategoryComponent implements OnInit {
 movielist: IMovie[] | undefined;
  WatchlistMovielist:number[] = [];
 categoryId: number = 0;
    constructor(
      private _moviesService: MoviesService,
      private _watchlistMovieService: WatchlistMovieService,
      private _toastr: ToastrService,
      private _activatedRoute: ActivatedRoute
    ) {}
  ngOnInit(): void {
        this.categoryId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
        console.log(this.categoryId);
        this.getMovieByCategory(this.categoryId);
        this.refreshWatchlistData();
  }



getMovieByCategory(categoryNumber:number): void {
     this._moviesService.getMovieByCategory(categoryNumber).subscribe({
      next: ({results}) => {
        this.movielist = results;
        console.log('Movies Category:', this.movielist);
        },
      error: (err) => {
        console.error('Error fetching popular movies:', err);
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
