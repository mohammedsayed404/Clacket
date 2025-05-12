import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../API/API';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

constructor(private _httpClient:HttpClient) { }

BaseUrl:string = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

Register(formData:FormGroup):Observable<IUser>{
  return this._httpClient.post<IUser>(`${this.BaseUrl}/register`,formData).pipe(
    tap((user:IUser)=>{
        if(user)
          this.setCurrentUser(user);
      })

  );
}
Login(formData:FormGroup):Observable<IUser>{
  return this._httpClient.post<IUser>(`${this.BaseUrl}/login`,formData).pipe(
     tap((user:IUser)=>{
        if(user)
          this.setCurrentUser(user);
      })

  );
}


  setCurrentUser(user:IUser):void{
    localStorage.setItem("token",JSON.stringify(user.token));
    this.currentUserSource.next(user);
  }



}
