import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserModel } from './../models/user.model';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (route.data.role && route.data.role.indexOf(currentUser.role) === -1) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}


// return this.authService.isLoggedIn
//   .pipe(
//     take(1),
//     map((isLoggedIn: UserModel) => {
//       if (!isLoggedIn) {
//         this.router.navigate(['/login']);
//         return false;
//       }
//       return true;
//     }));