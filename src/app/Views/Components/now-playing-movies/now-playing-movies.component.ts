import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { NowPlayingMovies } from '../../../Core/Interfaces/now-playing-movies';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";

@Component({
  selector: 'app-now-playing-movies',
  imports: [ScrollTopComponent],
  templateUrl: './now-playing-movies.component.html',
  styleUrl: './now-playing-movies.component.css'
})
export class NowPlayingMoviesComponent implements  OnInit {

  nowPlayingMoviesList: NowPlayingMovies[];
  
  constructor(private _CategoryService: CategoryService,
             private _watchlistMovieService:WatchlistMovieService,
             private _toastr: ToastrService){
    this.nowPlayingMoviesList = [];
  }
  ngOnInit(): void {

    this._CategoryService.getNowPlayingMovis().subscribe({
      next: (res) => {
        this.nowPlayingMoviesList = (res as { results: NowPlayingMovies[] }).results;
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
      this._toastr.success(response.status_message, "Clacket")

      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
      this._toastr.error(err.status_message, "Clacket")

      },
    });
  }

}