import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');

    const isAuthenticated = email && password;

    if (isAuthenticated) {
      if (
        (role === 'passenger' &&
          route.routeConfig?.path === 'driverDashboard') ||
        (role === 'driver' && route.routeConfig?.path === 'userDashboard')
      ) {
        return this.router.createUrlTree(['/home']);
      } else {
        return true;
      }
    } else {
      return this.router.createUrlTree(['/registration']);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class IsLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');

    const isLogin = email && password;

    if (isLogin && route.routeConfig?.path === 'login') {
      return role === 'passenger'
        ? this.router.createUrlTree(['userDashboard'])
        : this.router.createUrlTree(['driverDashboard']);
    } else {
      return true;
    }
  }
}
