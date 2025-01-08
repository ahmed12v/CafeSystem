import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  markAsPaid(employeeName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/pay`, { employeeName });
  }
}
