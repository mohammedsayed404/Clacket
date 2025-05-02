import { Injectable } from '@angular/core';
import { API } from '../../API/API';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistMovieService {

total_results:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient:HttpClient) { }

 //i will modify this later


GetWatchlist():Observable<any>{
  return this._httpClient.get(`${API.TMDBUrl}/account/${API.TMDB_Account_Id}/watchlist/movies`,{headers:API.TMDB_Header_Token});
}

AddToWatchlist(movieId:number):Observable<any>{ 
  return this._httpClient.post(`${API.TMDBUrl}/account/${API.TMDB_Account_Id}/watchlist`, {
    media_type: 'movie',
    media_id: movieId,
    watchlist: true
  },{headers:API.TMDB_Header_Token});

}


RemoveFromWatchlist(movieId:number):Observable<any>{
  return this._httpClient.post(`${API.TMDBUrl}/account/${API.TMDB_Account_Id}/watchlist`, {
    media_type: 'movie',
    media_id: movieId,
    watchlist: false
  },{headers:API.TMDB_Header_Token});
}


}
