import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private api =
    'https://rent-management-api-production.up.railway.app/api/dashboard';

  getDashboard(
    month: number,
    year: number
  ): Observable<Dashboard[]> {

    return this.http.get<Dashboard[]>(
      `${this.api}?month=${month}&year=${year}`
    );

  }

}