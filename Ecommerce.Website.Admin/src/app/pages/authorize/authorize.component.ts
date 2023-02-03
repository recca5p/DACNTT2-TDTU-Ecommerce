import { UserAccountInfo } from '../../models/users/user-account-info.model';
import { UserAccount } from '../../models/users/user-account.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Axios } from 'axios';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.authencate().subscribe((res) => {
      console.log(res);
    });
  }
}
