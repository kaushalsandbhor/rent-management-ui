import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { CurrentRent } from '../models/current-rent';
import { RentHistory } from '../models/rent-history';
import { ChangeRent } from '../models/change-rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private api = `${environment.apiUrl}/rent`;

  constructor(private http: HttpClient) {}

  getCurrentRent(): Observable<CurrentRent> {
    return this.http.get<CurrentRent>(
      `${this.api}/current`
    );
  }

  getHistory(): Observable<RentHistory[]> {
    return this.http.get<RentHistory[]>(
      `${this.api}/history`
    );
  }

  changeRent(request: ChangeRent): Observable<any> {
    return this.http.post(
      `${this.api}/change`,
      request
    );
  }

}