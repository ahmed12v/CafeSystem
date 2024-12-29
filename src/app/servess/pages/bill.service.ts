import { Bill, Order, Root } from './../../interfaces/pages/bill';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../interfaces/bases';
import { Observable, observeOn } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor( private _HttpClient:HttpClient) {
   }

  getBill(bill:Bill):Observable<any>
  {
    
    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)}

   
     return this._HttpClient.post<any>(`${enviroment.baseUrl}/api/admin/bill`,bill,{headers:headers})

  }
  TakeOrder(Order:Order):Observable<any>
  {
    
    let token = localStorage.getItem('usertokenlogin')
    let headers = new HttpHeaders()
    if(token){
     headers = headers.set('Authorization', 'Bearer ' + token)}

   
     return this._HttpClient.post<any>(`${enviroment.baseUrl}/api/admin/order`,Order,{headers:headers})

  }




}



