import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../bases";
import { Bill, Order } from "../pages/bill";

export interface Signin {
    name : string;
    email:string;
    password:string;
    passwordConfirm:string;
}
@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private _HttpClient: HttpClient) { }

  getBill(bill: Bill): Observable<any> {
    let token = localStorage.getItem('usertokenlogin');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this._HttpClient.post<any>(
      `${enviroment.baseUrl}/api/admin/bill`,
      bill,
      { headers: headers }
    );
  }
  TakeOrder(Order: Order): Observable<any> {
    let token = localStorage.getItem('usertokenlogin');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return this._HttpClient.post<any>(
      `${enviroment.baseUrl}/api/admin/order`,
      Order,
      { headers: headers }
    );
  }

  markBillAsPaid(employeeName: string): Observable<any> {
    let token = localStorage.getItem('usertokenlogin');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    const body = { employeeName };
    return this._HttpClient.put<any>(
      `${enviroment.baseUrl}/api/admin/pay`,
      body,
      { headers: headers }
    );
  }
}


