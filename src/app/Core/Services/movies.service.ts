import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../models/IMovie.interface';
import { Observable } from 'rxjs';
import { API } from '../../API/API';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  /**
   *
   */
  constructor(private http: HttpClient) {}
  private apiKey = API.APIKey;
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
}
