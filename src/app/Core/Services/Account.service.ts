import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../API/API';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

constructor(private _httpClient:HttpClient) { }

BaseUrl:string = environment.apiUrl;


Register(formData:FormGroup):Observable<any>{
  return this._httpClient.post(`${this.BaseUrl}/register`,formData);
}
Login(formData:FormGroup):Observable<any>{
  return this._httpClient.post(`${this.BaseUrl}/login`,formData);
}



}
