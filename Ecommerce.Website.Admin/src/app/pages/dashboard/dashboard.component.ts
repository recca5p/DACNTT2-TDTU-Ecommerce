import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}
  isCollapsed = false;

  async ngOnInit() {}

  logOut() {
    localStorage.removeItem('authorizeToken');
    location.reload();
  }
}
