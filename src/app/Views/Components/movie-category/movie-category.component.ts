import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../Core/Services/movies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { IMovie } from '../../../Core/models/IMovie.interface';
import { Movie } from '../../../Core/Interfaces/Movie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-category',
  imports: [CommonModule,RouterLink],
  templateUrl: './movie-category.component.html',
  styleUrl: './movie-category.component.css'
})
export class MovieCategoryComponent implements OnInit {
 movielist: IMovie[] | undefined;
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


    addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
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


}
