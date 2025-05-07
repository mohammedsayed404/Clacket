import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { Subscription } from 'rxjs';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending-movies-section',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './trending-movies-section.component.html',
  styleUrls: ['./trending-movies-section.component.css']
})
export class TrendingMoviesSectionComponent implements OnInit, OnDestroy {
  trendingMovies: any[] = [];
  loadingTrending: boolean = true;

  trendingMovieSubscribe: Subscription = new Subscription();
  watchlistMovieSubscribe: Subscription = new Subscription();

  @ViewChild('movieSlider') movieSlider!: ElementRef;
  
  currentSlide: number = 0;
  totalSlides: number = 0;
  dots: number[] = [];

  // Track watchlisted movies (new)
  watchlistMovieIds: Set<number> = new Set();

  constructor(
    private _mockMoviesService: MockMoviesService,
    private _watchlistMovieService: WatchlistMovieService
  ) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  getTrendingMovies(): void {
    this.trendingMovieSubscribe = this._mockMoviesService.GetTrendingMovies().subscribe({
      next: ({ results }) => {
        this.trendingMovies = results;
        this.loadingTrending = false;

        this.totalSlides = Math.ceil(this.trendingMovies.length / 4);
        this.dots = Array(this.totalSlides).fill(0).map((_, i) => i);
      },
      error: (err) => {
        console.error('Error fetching trending movies:', err);
        this.loadingTrending = false;
      },
    });
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.scrollToCurrentSlide();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.scrollToCurrentSlide();
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.scrollToCurrentSlide();
  }

  private scrollToCurrentSlide() {
    if (this.movieSlider) {
      const cardWidth = 180 + 16; // card width + gap
      const scrollPosition = this.currentSlide * cardWidth * 4; // 4 cards per view
      this.movieSlider.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  getRuntime(movie: any): string {
    if (movie.runtime) {
      return movie.runtime;
    } else {
      const hours = 1 + (Math.random() > 0.5 ? 1 : 0);
      const minutes = Math.floor(Math.random() * 6) * 5 + 30;
      return `${hours}h ${minutes}min`;
    }
  }

  getViews(movie: any): string {
    if (movie.views) {
      return movie.views;
    } else {
      const views = (Math.random() * 5 + 1).toFixed(Math.random() > 0.7 ? 1 : 0);
      return `${views}K`;
    }
  }

  // Watchlist Functions
  toggleWatchlist(movie: any): void {
    if (this.watchlistMovieIds.has(movie.id)) {
      this.watchlistMovieIds.delete(movie.id);
      console.log('Movie removed from watchlist:', movie.id);
    } else {
      this.addToWatchList(movie.id);
      this.watchlistMovieIds.add(movie.id);
      console.log('Movie added to watchlist:', movie.id);
    }
  }

  isInWatchlist(movieId: number): boolean {
    return this.watchlistMovieIds.has(movieId);
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
    this.trendingMovieSubscribe.unsubscribe();
    this.watchlistMovieSubscribe.unsubscribe();
  }
}
