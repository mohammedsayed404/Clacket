import { Component, inject ,signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { MoviesService } from '../../Services/movies.service';


@Component({
  selector: 'app-List-Search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  private movieService = inject(MoviesService);

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

}
