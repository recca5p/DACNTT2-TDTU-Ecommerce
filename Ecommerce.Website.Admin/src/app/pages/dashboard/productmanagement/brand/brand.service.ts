import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private _apiBrandEndpoint: string = `${environment.end_points.brand_service}`;

  constructor(private http: HttpClient) {}

  getBrands() {
    let url: string = `${this._apiBrandEndpoint}`;

    return this.http.get(url).toPromise();
  }
}
