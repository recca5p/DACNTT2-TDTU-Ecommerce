import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _apiCategoryEndpoint: string = `${environment.end_points.category_service}`;

  constructor(private http: HttpClient) {}

  getCategories() {
    let url: string = `${this._apiCategoryEndpoint}`;

    return this.http.get(url).toPromise();
  }
}
