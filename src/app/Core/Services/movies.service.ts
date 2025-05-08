import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../models/IMovie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  /**
   *
   */
  constructor(private http: HttpClient) {}
  private apiKey = environment.tmdbApiKey;
  private options = {
    headers: {
      Authorization: `Bearer ${environment.tmdbApiKey}`,
      accept: 'application/json'
    },
    params: {
      append_to_response: 'videos,credits'
    }
  };
  async getDetails(id: number): Promise<unknown> {
    const movie = (await fetch(`${environment.tmdbBaseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=videos,credits`)).json();
    return await movie;
  }
  getDetailsUsingHttpClient(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(`${environment.tmdbBaseUrl}/movie/${id}`, this.options);
  }
}
