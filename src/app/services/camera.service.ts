import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class CameraService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(environment.apiUrl + "/cameras/").pipe(
      map((response) => {
        return response;
      })
    );
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiUrl + "/cameras/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data) {
    return this.http.post<any>(environment.apiUrl + "/cameras/", data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http
      .put<any>(environment.apiUrl + "/cameras/" + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/cameras/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  log(page = 1, id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/cameras/" + id + "/logs?page=" + page)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  enableCamera(id: number) {
    return this.http
      .put<any>(environment.apiUrl + "/cameras/" + id + "/enable", {})
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  disableCamera(id: number) {
    return this.http
      .put<any>(environment.apiUrl + "/cameras/" + id + "/disable", {})
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
