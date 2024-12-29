import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../interfaces/bases';
import { Observable } from 'rxjs';
import { add, Emp, postEmp } from '../../interfaces/pages/emp';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor( private _HttpClient:HttpClient) { }
  
 // usertoken={
  ////  Bearertoken:localStorage.getItem('usertokenlogin') || ''
 // }

   

  getAllEmp():Observable<Emp>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.get<Emp>(`${enviroment.baseUrl}/api/emp`,{headers : headers})

     
  }
  ///////////////////////////// add  ///////////////////////////////
  AddEmp(data:postEmp):Observable<add>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.post<add>(`${enviroment.baseUrl}/api/emp`,data,{headers : headers})

     
  }
  ///////////////////////////// updat ///////////////////////////////

  updatEmp(data:postEmp , id:string):Observable<any>
  {
   

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.put<any>(`${enviroment.baseUrl}/api/emp/${id}`,data,{headers : headers})

     
  }


 //////////////delet/////////////////////////////////////

deletupdatEmp(id:string):Observable<any>
  {

    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)
    }
 

     return this._HttpClient.delete<any>(`${enviroment.baseUrl}/api/emp/${id}`,{headers : headers})

     
  }

}
