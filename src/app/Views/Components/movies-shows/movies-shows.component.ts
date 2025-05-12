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
  this._watchlistMovieService.GetWatchlist().subscribe({
      next: ({results} : {results: IMovie[]}) => {
        this.WatchlistMovielist = results.map(movie => movie.id);
        console.log(results);
      },
      error: (err) => {
        console.log(err);
      },
    });
}

  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: (response) => {
        //make it updated to using it in html toggle button
        this.WatchlistMovielist.push(movieId);
        console.log('Movie added to watchlist:', response);

        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
        this._toastr.success("Moview added sussufully ")
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
        this._toastr.error("movie removed sussufully")
      },
    });
  }


  RemoveFromWatchlist(movieId: number): void {

    this._watchlistMovieService.RemoveFromWatchlist(movieId).subscribe({
      next: (response) => {
        this.WatchlistMovielist = this.WatchlistMovielist.filter(id => id !== movieId);
        console.log('Movie removed from watchlist:', response);
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value - 1);
        this.WatchlistMovielist.filter(id => id !== movieId);
        this._toastr.success(response.status_message, "Clacket")

      },
      error: (err) => {
        console.error('Error removing movie from watchlist:', err);
        this._toastr.error(err.status_message, "Clacket")

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
