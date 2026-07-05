import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private http = inject(HttpClient);

  private api =
    'https://rent-management-api-production.up.railway.app/api/tenants';

  createTenant(request: any) {

    return this.http.post(
      this.api,
      request
    );

  }

}