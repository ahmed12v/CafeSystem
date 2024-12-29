import {  enviroment } from './../../interfaces/bases';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { code, Fogetpass, passNew } from '../../interfaces/athuntocation/fogetpass';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {
  decoUserdata() {
    throw new Error('Method not implemented.');
  }

  constructor(private _HttpClient:HttpClient) { }

  forgetpassword(data:Fogetpass):Observable<any>
  {
   return this._HttpClient.post(`${enviroment.baseUrl}/api/auth/forgotPassword`,data)
  }

/////////////////////////////////////////////////////////////////////////////////

  SendCode(data:code):Observable<any>
  {
   return this._HttpClient.post(`${enviroment.baseUrl}/api/auth/verifyResetCode`,data)
  }
   ///////////////////////////////////////////////////////////////////////////////
   
   newpass(data:passNew):Observable<any>
   {
    return this._HttpClient.put(`${enviroment.baseUrl}/api/auth/resetPassword`,data)
   }
 

}
