import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { drinkRes, drinks, postdrink, updatdrink } from '../../interfaces/drinks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../interfaces/bases';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor( private _HttpClient:HttpClient) { }

  getAlldrink():Observable<drinks>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.get<drinks>(`${enviroment.baseUrl}/api/drink`,{headers : headers})

     
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  Adddrink(data:postdrink):Observable<drinkRes>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.post<drinkRes>(`${enviroment.baseUrl}/api/drink`,data,{headers : headers})

     
  }
  /////////////////////////////////////////////////////////////////////
  updatdrink(data:updatdrink , id:string):Observable<any>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.put<any>(`${enviroment.baseUrl}/api/drink/${id}`,data,{headers : headers})

     
  }
  ///////////////////////////////////////////////////////////////
  deletupdatEmp(id:string):Observable<any>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.delete<any>(`${enviroment.baseUrl}/api/drink/${id}`,{headers : headers})

     
  }
}
