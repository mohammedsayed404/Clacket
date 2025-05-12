import { Component, inject ,signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { MoviesService } from '../../Services/movies.service';
import { Movie } from '../../Interfaces/Movie';
import { WatchlistMovieService } from '../../Services/WatchlistMovie.service';
import { ToastrService } from 'ngx-toastr';
import { TmdbImageUrlPipe } from "../../pipes/tmdb-image-url.pipe";


@Component({
  selector: 'app-List-Search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TmdbImageUrlPipe],
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  private movieService = inject(MoviesService);
  WatchlistMovielist:number[] = [];
  constructor(private _watchlistMovieService: WatchlistMovieService,private _toastr: ToastrService,){}
  // State
  movies = this.movieService.movies;
  isLoading = this.movieService.isLoading;
  error = this.movieService.error;
  currentFilter = signal<string>('popular');
  activeTab = this.movieService.activeTab;
  searchResults = this.movieService.searchResults;
  searchQuery = this.movieService.searchQuery;
  totalPages = this.movieService.totalPages;
  currentPage = this.movieService.currentPage;
  totalResults = this.movieService.totalResults;

  sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'now_playing', label: 'Now Playing' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' }
  ];
  searchTerm = '';

  loadMovies(filter: string,page: number = 1) {
    this.currentFilter.set(filter);
    this.movieService.getMovies(filter,page).subscribe();
  }
  onSearch() {
    this.movieService.searchMovies(this.searchTerm).subscribe();
  }

  ngOnInit() {
    this.loadMovies(this.currentFilter());
  }
  //pagination
  getPages(): number[] {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage() - 2);
    let end = Math.min(this.totalPages(), start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.movieService.currentPage.set(page);
      if (this.activeTab() == 'search')
        this.onSearch();
      else
        this.movieService.getMovies(this.currentFilter(),page).subscribe();
    }
  }

getWatchList():void{
  this._watchlistMovieService.GetWatchlist().subscribe({
      next: ({results} : {results: Movie[]}) => {
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


}
