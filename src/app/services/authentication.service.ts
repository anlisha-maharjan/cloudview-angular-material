import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';
import { AngularTokenService } from "angular-token";

@Injectable()
export class AuthenticationService {
  public userObservable = new Subject<any>();
  emitUser(val) {
    this.userObservable.next(val);
  }
  constructor(private http: HttpClient, private tokenService: AngularTokenService) { }

  login(email: string, password: string) {
    return this.tokenService.signIn({ login: email, password: password }).pipe(map(response => {
      return response;
    }));
  }

  register(company_name:string, email: string, password: string, confirmPassword: string, fullName: string) {
    return this.tokenService.registerAccount({
      login: email,
      password: password,
      passwordConfirmation: confirmPassword,
      name: fullName,
      company_name: company_name
    }).pipe(map(response => {
      return response;
    }));
  }

  forgotPassword(email: string) {
    return this.tokenService.resetPassword({
      login: email
    }).pipe(map(response => {
      return response;
    }));
  }

  resetPassword(password: string, confirmPassword: string, oldPassword: string, uid, client, accessToken) {
    const headers = new HttpHeaders({ 'uid': uid, 'client': client, 'access-token': accessToken });
    return this.http.put<any>(environment.apiUrl + "/auth/password",
      { password: password, password_confirmation: confirmPassword },
      { headers: headers }).pipe(
        map(response => {
          return response;
        })
      );
  }

  updatePassword(password: string, confirmPassword: string, oldPassword: string) {
    return this.tokenService.updatePassword({
      password: password,
      passwordConfirmation: confirmPassword,
      passwordCurrent: oldPassword,
    }).pipe(map(response => {
      return response;
    }));
  }

  deleteAccount() {
    return this.tokenService.deleteAccount().pipe(map(response => {
      return response;
    }));
  }

  validateToken() {
    return this.tokenService.validateToken();
  }

  logout() {
    return this.tokenService.signOut().pipe(map(response => {
      return response;
    }));
  }
}
