import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/payments`;
  collectPayment(body: any): Observable<any> {

    return this.http.put(
    `${this.api}/collect`,
    body,
    { responseType: 'text' }
);

  }

}