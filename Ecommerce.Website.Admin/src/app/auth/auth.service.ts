import { UserAccountInfo } from '../models/users/user-account-info.model';
import { UserAccount } from '../models/users/user-account.model';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiEndpoint: string = `${environment.end_points.product_service}`;

  constructor(private http: HttpClient) {}

  signIn(userAccount: UserAccount) {
    let url: string = `${this._apiEndpoint}/signin`;

    return this.http.post(url, userAccount);
  }

  signUp(userAccountInfo: UserAccountInfo) {
    let url: string = `${this._apiEndpoint}/signup`;

    return this.http.post(url, userAccountInfo).toPromise();
  }

  authencate() {
    let url: string = `${this._apiEndpoint}`;

    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      }),
      withCredentials: true,
    };

    return this.http.get(url);
  }
}
