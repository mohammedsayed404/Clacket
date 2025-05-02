import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../API/API';
import { NowPlayingMovies } from '../Interfaces/now-playing-movies';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // apikey =  "55d89f63393848325bc1c5c988edb553";
  
  constructor(private _httpClient:HttpClient) { 
    
  }


  getNowPlayingMovis(pageNumber : number =1):Observable<any>  
  {
    return this._httpClient.get(`${API.TMDBUrl}/movie/now_playing?language=${API.language}&page=${pageNumber}&api_key=${API.APIKey}`);
  }

  getPopularMovis(pageNumber : number =2):Observable<any>  
  {
    return this._httpClient.get(`${API.TMDBUrl}/movie/popular?language=${API.language}&page=${pageNumber}&api_key=${API.APIKey}`);
  }

  getTopRatedMovis(pageNumber : number =1):Observable<any>  
  {
    return this._httpClient.get(`${API.TMDBUrl}/movie/top_rated?language=${API.language}&page=${pageNumber}&api_key=${API.APIKey}`);
  }

  getUpcomingMovis(pageNumber : number =1):Observable<any>  
  {
    return this._httpClient.get(`${API.TMDBUrl}/movie/upcoming?language=${API.language}&page=${pageNumber}&api_key=${API.APIKey}`);
  }

  getMovieDetails(movie_id: number) :Observable<any> 
  {//https://api.themoviedb.org/3/movie/{movie_id}
    return  this._httpClient.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=bb719a0995d909ccf6b0f20d425c9698`)
  }

}
