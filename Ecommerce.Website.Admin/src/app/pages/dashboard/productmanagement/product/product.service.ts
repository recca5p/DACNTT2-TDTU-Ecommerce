import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _apiProductEndpoint: string = `${environment.end_points.product_service}`;
  private _apiImageEndpoint: string = `${environment.end_points.image_service}`;

  constructor(private http: HttpClient) {}

  getProducts() {
    let url: string = `${this._apiProductEndpoint}`;

    return this.http.get(url).toPromise();
  }

  uploadImage(data: any) {
    let url: string = `${this._apiImageEndpoint}`;

    return this.http.post(url, data).toPromise();
  }
}
