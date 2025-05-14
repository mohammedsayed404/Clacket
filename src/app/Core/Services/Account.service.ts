import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
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


GetUserId(){

  const token = localStorage.getItem("token");

  if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return userId;
    }
}

GetAdmin():string | undefined{

  const token = localStorage.getItem("token");

  if (token) {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string;
      return role;
    }

    return;
}



setCurrentUser(user:IUser):void{
    localStorage.setItem("token",user.token);
    this.currentUserSource.next(user);
}



}


