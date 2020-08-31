import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  NavigationEnd
} from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthenticationService) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        // detect end of navigation for app routes
      }
    });
  }

  validateToken(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authservice.validateToken().map(
      data => {
        if (data.success) {
          return true;
        }
        // error when verify so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      },
      error => {
        // error when verify so redirect to login page with the return url
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }).catch((error: any) => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return Observable.throwError(error);
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.validateToken(route, state);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.validateToken(route, state);
  }
}
