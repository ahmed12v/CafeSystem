import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'https://ethaad-cafe.onrender.com/api/admin';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  getOrderByEmplyeeName(employeeName: string): Observable<any> {
    const params = new HttpParams().set('employeeName', employeeName);
    return this.http.get(`${this.baseUrl}/all-bills`, { params });
  }

  updateDrink(body: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/orders/update-drink`, body);
  }

  deleteDrink(body: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/remove-drink`, { body });
  }

  // markAsPaid(employeeName: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/pay`, { employeeName });
  // }
  markAsPaid(employeeName: string): Observable<any> {
    // let token = localStorage.getItem('usertokenlogin');
    // let headers = new HttpHeaders();
    // if (token) {
    //   headers = headers.set('Authorization', 'Bearer ' + token);
    // }
    const body = { employeeName };
    return this.http.put<any>(`${this.baseUrl}/pay`, body);
  }
}
