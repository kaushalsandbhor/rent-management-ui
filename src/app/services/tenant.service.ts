import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tenant } from '../models/tenant';

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

  getAllTenants() {

  return this.http.get<Tenant[]>(this.api);

}

updateTenant(id: number, request: any) {

  return this.http.put(

    `${this.api}/${id}`,

    request

  );

}

vacateTenant(id: number, request: any) {

  return this.http.put(

    `${this.api}/${id}/vacate`,

    request

  );

}

}