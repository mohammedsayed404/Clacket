import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../API/API';
import { Observable } from 'rxjs';
import { IMovie } from '../models/IMovie.interface';

@Injectable({
  providedIn: 'root'
})
export class MockMoviesService {
  constructor(private _httpClient: HttpClient) {}

  GetTrendingMovies(): Observable<any> {
    return this._httpClient.get(`${API.TMDBUrl}/trending/movie/day`, {
      headers: API.TMDB_Header_Token,
    });
  }

  GetPopularMovies(): Observable<any> {
    return this._httpClient.get(`${API.TMDBUrl}/movie/popular`);
  }
}
