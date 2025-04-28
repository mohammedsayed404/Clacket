import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError ,map } from 'rxjs';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

interface ApiResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '55d89f63393848325bc1c5c988edb553'; 
  
  movies = signal<Movie[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  totalPages = signal(1); 
  currentPage = signal(1);
  totalResults = signal(0);
  searchResults = signal<Movie[]>([]);
  searchQuery = signal(''); 
  activeTab = signal<'search' | 'else'>('else'); 
  

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<void> {
    if (!query.trim()) {
      this.searchResults.set([]);
      return new Observable(subscriber => subscriber.next());
    }
    this.ResetPagination(1);
    this.isLoading.set(true);
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    ).pipe(
      tap(response => {
        this.searchResults.set(response.results);
        this.totalPages.set(response.total_pages);
        this.totalResults.set(response.total_results);
        this.activeTab.set('search');
        this.isLoading.set(false);
      }),
      catchError(err => {
        this.error.set('Search failed');
        this.isLoading.set(false);
        return throwError(() => err);
      }),
      map(() => void 0)
    );
  }
  getMovies(filter: string,page: number = 1): Observable<ApiResponse> {
    this.isLoading.set(true);
    this.error.set(null);
    this.ResetPagination(page);
    return this.http.get<ApiResponse>(
      `${this.apiUrl}/movie/${filter}?api_key=${this.apiKey}&page=${page}`
    ).pipe(
      tap({
        next: (response) => {
          this.movies.set(response.results);
          this.totalPages.set(response.total_pages);
          this.totalResults.set(response.total_results);
          this.activeTab.set('else');
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load movies. Please try again later.');
          this.isLoading.set(false);
        }
      }),
      catchError(err => {
        console.error('API Error:', err);
        return throwError(() => err);
      })
    );
  }

  
  ResetPagination(page:number){
    if (page == 1){
      this.currentPage.set(1);
    }
  }
}