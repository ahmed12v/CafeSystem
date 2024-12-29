import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../interfaces/bases';
import { forget, Login } from '../../interfaces/athuntocation/login';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { platformBrowser } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private _HttpClient:HttpClient ,private _Router:Router , ) {
    if( typeof localStorage != 'undefined' ){
   if(localStorage.getItem('usertokenlogin')){
    this.decoUserdata();
    this._Router.navigate([localStorage.getItem('last Page')])
   }
    }
   }

  login(data:Login):Observable<any>
  {
  return  this._HttpClient.post(`${enviroment.baseUrl}/api/auth/login`, data)
  }

  forgetpass(data:forget):Observable<any>
  {
  return  this._HttpClient.post(`${enviroment.baseUrl}/api/auth/forgotPassword`, data)
  }

  
  userdataInlogin:BehaviorSubject<any>=new BehaviorSubject(null);  

  decoUserdata(){
     
    const token = JSON.stringify(localStorage.getItem('usertokenlogin'));
    const decoded = jwtDecode(token); 
    this.userdataInlogin.next(decoded);
  //  console.log(this.userdata)
  }

  logout(){
    localStorage.removeItem('usertokenlogin')
    this.userdataInlogin.next(null)
    this._Router.navigate(['/home'])
  }
}
