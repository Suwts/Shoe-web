import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService : TokenService
) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.tokenService.getToken();
    if (isLoggedIn == null) {
      this.router.navigateByUrl('/login'); // Redirect to login if not logged in
      return false;
    }
    return true; // Allow access to the route if logged in
  }
}