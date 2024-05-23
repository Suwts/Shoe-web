import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(
    private router: Router,
    private tokenService : TokenService,
    private userService : UserService
) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.tokenService.getToken();
    const userDetail = this.userService.getDetailUser();
    if(isLoggedIn !== null){
        if (userDetail.role.name === "ROLE_ADMIN"){
            return true;
        }
    }
    this.router.navigateByUrl('/login'); // Redirect to login if not logged in
    return false;
   
  }
}