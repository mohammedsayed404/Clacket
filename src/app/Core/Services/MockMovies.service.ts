import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../API/API';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockMoviesService {
// export class MockMoviesService {


  TMDBUrl:string = API.TMDBUrl
  Key:string = API.APIKey


  constructor(private _httpClient:HttpClient) { }
///trending/all/day?api_key=bb719a0995d909ccf6b0f20d425c9698


GetTrindingMovies():Observable<any>{
  return this._httpClient.get(`${this.TMDBUrl}/trending/movie/day?api_key=${this.Key}`);
  }



}
