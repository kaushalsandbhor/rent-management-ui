import { Injectable } from '@angular/core';
import { FlatDropdown } from '../models/flat-dropdown';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  private flatApi = `${environment.apiUrl}/flats`;

  constructor(private http: HttpClient) { }

  getVacantFlats(joiningDate: string) {

  return this.http.get<FlatDropdown[]>(
    `${this.flatApi}/vacant?joiningDate=${joiningDate}`
  );

}
}
