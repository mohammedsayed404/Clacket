import { Component, OnDestroy, OnInit } from '@angular/core';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollTopComponent } from "../scroll-top/scroll-top.component";
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TrendingMoviesSectionComponent } from '../trending-movies-section/trending-movies-section.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TrendingMoviesSectionComponent, ScrollTopComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
 
  constructor(
    private _mockMoviesService: MockMoviesService,
    private _watchlistMovieService: WatchlistMovieService,
    private _toastr: ToastrService,
  ) {}

  // trendingMovies: any[] = [];
  popularMovies: any[] = [];
  // loadingTrending: boolean = true;       
  loadingPopular: boolean = true;      

  // trendingMovieSubscribe: Subscription = new Subscription();
  popularMovieSubscribe: Subscription = new Subscription();
  watchlistMovieSubscribe: Subscription = new Subscription();

  ngOnInit(): void {
    // this.getTrendingMovies();
    this.getPopularMovies();
  }

  // getTrendingMovies(): void { ... }

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
        this._toastr.success(response.status_message, "Clacket")
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
        this._toastr.error(err.status_message, "Clacket")
      },
    });
  }

  ngOnDestroy(): void {
    // this.trendingMovieSubscribe.unsubscribe();
    this.popularMovieSubscribe.unsubscribe();
    this.watchlistMovieSubscribe.unsubscribe(); 
  }
}
