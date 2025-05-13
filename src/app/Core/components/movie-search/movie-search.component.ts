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
    this.refreshWatchlistData();
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

refreshWatchlistData():void{
    this._watchlistMovieService.getClacketWatchlist().subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        console.log(movieIds);
       }

  });
}
  addToWatchList(movieId: number): void {
    this._watchlistMovieService.AddToWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value + 1);
        this._toastr.success("Moview added sussufully ")
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }


  RemoveFromWatchlist(movieId: number): void {

    this._watchlistMovieService.RemoveFromWatchlist(movieId).subscribe({
      next: ({movieIds}) => {
        this.WatchlistMovielist = movieIds;
        this._watchlistMovieService.total_results.next(this._watchlistMovieService.total_results.value - 1);
        this._toastr.success("movie removed sussufully");

      },
      error: (err) => {
        this._toastr.error(err);
      },
    });

}


}
