import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMovie } from '../../../Core/models/IMovie.interface';
import { MoviesService } from '../../../Core/Services/movies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-ten',
  imports: [CommonModule,RouterLink],
  templateUrl: './top-ten.component.html',
  styleUrl: './top-ten.component.css'
})
export class TopTenComponent {

topTenByGeners: IMovie[] | undefined;
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
  }



getTopTenByGeners(categoryNumber:number):void{
  this._mockMoviesService.GetTopTenByGeners(categoryNumber).subscribe({
    next: ({ results }) => {
      this.topTenByGeners = results;
      console.log('top 10  Movies:', this.topTenByGeners);
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
