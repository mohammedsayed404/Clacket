import { Injectable } from '@angular/core';
import { API } from '../../API/API';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from './Account.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistMovieService {

total_results:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient:HttpClient, private _accountService:AccountService) { }

 //i will modify this later

 private baseUrl:string = environment.apiUrl


GetWatchlist(moviesId:number):Observable<any>{

  // return this._httpClient.get(`${API.TMDBUrl}/account/${API.TMDB_Account_Id}/watchlist/movies`,{headers:API.TMDB_Header_Token});
  return this._httpClient.get(`${API.TMDBUrl}/movie/${moviesId}`);
}



getClacketWatchlist():Observable<any>{
  return this._httpClient.get(`${this.baseUrl}/watchlist/${this._accountService.GetUserId()}`);
}

AddToWatchlist(movieId:number):Observable<any>{
  return this._httpClient.post(`${this.baseUrl}/watchlist`, {
    userId: this._accountService.GetUserId(),
    movieId: movieId,
    added: true
  });


}


RemoveFromWatchlist(movieId:number):Observable<any>{
  return this._httpClient.post(`${this.baseUrl}/watchlist`, {
    userId: this._accountService.GetUserId(),
    movieId: movieId,
    added: false
  });
}




}
