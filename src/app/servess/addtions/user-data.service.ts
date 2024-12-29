import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../interfaces/bases';
import { UpdatUserD, UpdatUserPass, userdata } from '../../interfaces/userdata';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _HttpClient:HttpClient ) { }

  getUserData():Observable<userdata>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.get<userdata>(`${enviroment.baseUrl}/api/users/getMe`,{headers : headers})

     
  };
  /////////////////////////////////////////////////////////////
  UpdatUserData(data:UpdatUserD):Observable<any>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.put<any>(`${enviroment.baseUrl}/api/users/updateMe`,data,{headers : headers})

     
  };
  ///////////////////////////////////////////////////////////////////////
  UpdatUserPassword(data:UpdatUserPass):Observable<any>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.put<any>(`${enviroment.baseUrl}/api/users/changeMyPassword`,data,{headers : headers})

     
  };

}
