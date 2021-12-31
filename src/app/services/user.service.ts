import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<any>(environment.apiUrl + "/users/").pipe(
      map((response) => {
        return response;
      })
    );
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiUrl + "/users/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data) {
    return this.http.post<any>(environment.apiUrl + "/users/", data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http
      .put<any>(environment.apiUrl + "/users/" + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/users/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
