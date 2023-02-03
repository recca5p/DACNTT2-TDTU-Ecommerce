import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authService.authencate() === false ||
      localStorage.getItem('authorizeToken') == null ||
      localStorage.getItem('authorizeToken') == undefined
    ) {
      this.router.navigate(['auth']);
    }
    return true;
  }
}
