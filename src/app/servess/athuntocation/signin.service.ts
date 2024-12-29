import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signin } from '../../interfaces/athuntocation/signin';
import { enviroment } from '../../interfaces/bases';
import {  Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SigninService {
  

  constructor( private _HttpClient:HttpClient) { }

  signin(data:Signin):Observable<any>
  {
  return  this._HttpClient.post(`${enviroment.baseUrl}/api/auth/signup`, data)

  }

   
}
