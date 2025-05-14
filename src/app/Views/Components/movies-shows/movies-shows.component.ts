import { Component, OnInit, ViewChild } from '@angular/core';
import { IMovie } from '../../../Core/models/IMovie.interface';
import { ToastrService } from 'ngx-toastr';
import { MockMoviesService } from '../../../Core/Services/MockMovies.service';
import { WatchlistMovieService } from '../../../Core/Services/WatchlistMovie.service';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { TmdbImageUrlPipe } from "../../../Core/pipes/tmdb-image-url.pipe";
import { GenresComponent } from "../genres/genres.component";
import { NavigationControlsComponent } from "../../../Shared/navigation-controls/navigation-controls.component";
import { RouterLink } from '@angular/router';
import { MovieSearchComponent } from "../../../Core/components/movie-search/movie-search.component";

@Component({
  selector: 'app-movies-shows',
  imports: [CommonModule, CarouselModule, TmdbImageUrlPipe, GenresComponent, NavigationControlsComponent, RouterLink, MovieSearchComponent],
  templateUrl: './movies-shows.component.html',
  styleUrl: './movies-shows.component.css'
})
export class MoviesShowsComponent  implements OnInit {

popularMovies: IMovie[] = [];
topTenByGeners: IMovie[] = [];
trendingMovies: IMovie[] = [];
WatchlistMovielist:number[] = [];

  constructor(
    private _mockMoviesService: MockMoviesService,
    private _watchlistMovieService: WatchlistMovieService,
    private _toastr: ToastrService,
  ) {}




  ngOnInit(): void {
    // this.getTrendingMovies();
    this.getPopularMovies();
    this.getTrendingMovies();
    this.refreshWatchlistData();
  }


  getPopularMovies(): void {
     this._mockMoviesService.GetPopularMovies().subscribe({
      next: ({ results }) => {
        this.popularMovies = results;
        console.log('Popular Movies:', this.popularMovies);
      },
    });
  }

    getTrendingMovies(): void {
     this._mockMoviesService.GetTrendingMovies().subscribe({
      next: ({ results }) => {
        this.trendingMovies = results;
        console.log('Trending Movies:', this.trendingMovies);

      },
    });
  }

getWatchList():void{
  this._watchlistMovieService.getClacketWatchlist().subscribe({
      next: ({MovieIds}) => {
        this.WatchlistMovielist = MovieIds;
        console.log(MovieIds);
      },

      error: (err) => {
        console.log(err);
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
        this._toastr.success("added sussufully")
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


  @ViewChild('popularMoviesCarousel', { static: false }) popularMoviesCarousel?: CarouselComponent;
  @ViewChild('trendingMoviesCarousel', { static: false }) trendingMoviesCarousel?: CarouselComponent;


popularMoviesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay: true,
  navSpeed: 700,
  navText: ['‹', '›'],
  responsive: {
    0: { items: 1 },
    400: { items: 1 },
    600: { items: 1 },
    768: { items: 1 },
    1024: { items: 1 },
    1200: { items: 1 },
    1400: { items: 1 }
  },
  nav: false,
  //  dotsEach: true,
};


trendingMoviesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay: true,
  navSpeed: 700,
  navText: ['‹', '›'],
  responsive: {
     0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    992: { items: 4 },
    1200: { items: 5 },
    1400: { items: 6 }
  },
  nav: false,
};
goNext() {
  this.popularMoviesCarousel?.next();
}
goPrev() {
  this.popularMoviesCarousel?.prev();
}


}
