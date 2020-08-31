import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { ResponseContentType } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { AngularTokenService } from 'angular-token';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private route: ActivatedRoute, private tokenService: AngularTokenService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.userSignedIn()) {
      const authData = this.tokenService.currentAuthData;
      request = request.clone({
        setHeaders: {
          'uid': `${authData ? authData.uid : ""}`,
          'access-token': `${authData ? authData.accessToken : ""}`,
          'client': `${authData ? authData.client : ""}`
        }
      });
    }
    return next.handle(request);
  }
}
