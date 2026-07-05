import { Injectable } from '@angular/core';
import { FlatDropdown } from '../models/flat-dropdown';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  private flatApi = 'https://rent-management-api-production.up.railway.app/api/flats';

  constructor(private http: HttpClient) { }

  getVacantFlats(joiningDate: string) {

  return this.http.get<FlatDropdown[]>(
    `${this.flatApi}/vacant?joiningDate=${joiningDate}`
  );

}
}
