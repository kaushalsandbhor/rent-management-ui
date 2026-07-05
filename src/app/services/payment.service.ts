import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private api = 'https://rent-management-api-production.up.railway.app/api/payments';
  collectPayment(body: any): Observable<any> {

    return this.http.put(
    `${this.api}/collect`,
    body,
    { responseType: 'text' }
);

  }

}