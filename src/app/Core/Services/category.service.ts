import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../API/API';
import { NowPlayingMovies } from '../Interfaces/now-playing-movies';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apikey =  "55d89f63393848325bc1c5c988edb553";
  
  constructor(private _httpClient:HttpClient) { 
    // hegegs
  }


  getNowPlayingMovis():Observable<any>  
  {
    
    return this._httpClient.get(`${API.TMDBUrl}/movie/now_playing?language=${API.language}&page=1&api_key=${API.APIKey}`);
  }

  getPopularMovis():Observable<any>  
  {
    
    return this._httpClient.get(`${API.TMDBUrl}/movie/popular?language=${API.language}&page=1&api_key=${API.APIKey}`);
  }

  getTopRatedMovis():Observable<any>  
  {
    
    return this._httpClient.get(`${API.TMDBUrl}/movie//top_rated?language=${API.language}&page=1&api_key=${API.APIKey}`);
  }

  getUpcomingMovis():Observable<any>  
  {
   
    return this._httpClient.get(`${API.TMDBUrl}/movie/upcoming?language=${API.language}&page=1&api_key=${API.APIKey}`);
  }

}
