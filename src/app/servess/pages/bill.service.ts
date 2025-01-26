import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillServices {
  private baseUrl = 'https://ethaad-cafe.onrender.com/api/admin';

  constructor(private http: HttpClient) {}

  markAsPaid(employeeName: string): Observable<any> {
    const body = { employeeName };
    return this.http.put<any>(`${this.baseUrl}/pay`, body);
  }

  partialPayment(
    employeeName: string,
    startDate: Date,
    endDate: Date
  ): Observable<any> {
    const body = { employeeName, startDate, endDate };
    return this.http.put<any>(`${this.baseUrl}/partial-pay`, body);
  }
}
