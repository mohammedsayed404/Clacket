import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../models/IMovie.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { API } from '../../API/API';
import { Movie } from '../Interfaces/Movie';
import { ApiResponse } from '../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies = signal<Movie[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  totalPages = signal(1);
  currentPage = signal(1);
  totalResults = signal(0);
  searchResults = signal<Movie[]>([]);
  searchQuery = signal('');
  activeTab = signal<'search' | 'else'>('else');
  constructor(private http: HttpClient) {}
  private apiKey = API.APIKey;
  private apiUrl = API.TMDBUrl;
  private options = {
    headers: {
      Authorization: `Bearer ${API.TMDBUrl}`,
      accept: 'application/json'
    },
    params: {
      append_to_response: 'videos,credits'
    }
  };
  async getDetails(id: number): Promise<unknown> {
    const movie = (await fetch(`${API.TMDBUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=videos,credits`)).json();
    return await movie;
  }
  getDetailsUsingHttpClient(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(`${API.TMDBUrl}/movie/${id}`, this.options);
  }

//==================//

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
