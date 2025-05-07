import { Component, OnDestroy, OnInit } from '@angular/core';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TrendingMoviesSectionComponent } from '../trending-movies-section/trending-movies-section.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TrendingMoviesSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // trendingMovies: any[] = [];
  popularMovies: any[] = [];
  // loadingTrending: boolean = true;       //instead of spinning loader
  loadingPopular: boolean = true;       //instead of spinning loader

  // trendingMovieSubscribe: Subscription = new Subscription();
  popularMovieSubscribe: Subscription = new Subscription();
  watchlistMovieSubscribe: Subscription = new Subscription();

  constructor(
    private _mockMoviesService: MockMoviesService,
    private _watchlistMovieService: WatchlistMovieService
  ) {}

  ngOnInit(): void {
    // this.getTrendingMovies();
    this.getPopularMovies();
  }

  // getTrendingMovies(): void {
  //   this.trendingMovieSubscribe = this._mockMoviesService.GetTrendingMovies().subscribe({
  //     next: ({ results }) => {
  //       this.trendingMovies = results;
  //       console.log('Trending Movies:', this.trendingMovies);
  //       this.loadingTrending = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching trending movies:', err);
  //       this.loadingTrending = false;
  //     },
  //   });
  // }

  getPopularMovies(): void {
    this.popularMovieSubscribe = this._mockMoviesService.GetPopularMovies().subscribe({
      next: ({ results }) => {
        this.popularMovies = results;
        console.log('Popular Movies:', this.popularMovies);
        this.loadingPopular = false;
      },
      error: (err) => {
        console.error('Error fetching popular movies:', err);
        this.loadingPopular = false;
      },
    });
  }

  addToWatchList(movieId: number): void {
    this.watchlistMovieSubscribe = this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
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
    // this.trendingMovieSubscribe.unsubscribe();
    this.popularMovieSubscribe.unsubscribe();
    // this.watchlistMovieSubscribe.unsubscribe();
  }
}
