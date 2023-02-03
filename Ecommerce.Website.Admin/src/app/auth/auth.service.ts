import { UserAccountInfo } from '../models/users/user-account-info.model';
import { UserAccount } from '../models/users/user-account.model';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiEndpoint: string = `${environment.end_points.auth_service}`;
  private toket: string =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZjA5ODdjZi1mMDMyLTQ0YjctYTJiOS0xYjQ2ZDdhNWQ5OTEiLCJleHAiOjE3MTE2MzU1OTUsImlhdCI6MTY3NTM0NzU5NX0.CeVB32Mp9lD031XM-2oISub21ozDQY_PDFSMOH3pJFMqQ1H3BomId46O08i6FHMGcqsEaHYimjq8wLqrCEIrXg';

  constructor(private http: HttpClient) {}

  signIn(userAccount: UserAccount) {
    let url: string = `${this._apiEndpoint}/signin`;

    return this.http.post(url, userAccount).toPromise();
  }

  signUp(userAccountInfo: UserAccountInfo) {
    let url: string = `${this._apiEndpoint}/signup`;

    return this.http.post(url, userAccountInfo).toPromise();
  }

  authencate() {
    let url: string = `${this._apiEndpoint}?token=Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxZjA5ODdjZi1mMDMyLTQ0YjctYTJiOS0xYjQ2ZDdhNWQ5OTEiLCJleHAiOjE3MTE2MzU1OTUsImlhdCI6MTY3NTM0NzU5NX0.CeVB32Mp9lD031XM-2oISub21ozDQY_PDFSMOH3pJFMqQ1H3BomId46O08i6FHMGcqsEaHYimjq8wLqrCEIrXg`;

    return true;
  }
}
