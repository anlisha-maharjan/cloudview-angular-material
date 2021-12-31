import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class UnknownFaceService {
  constructor(private http: HttpClient) {}

  getAll(page = 1) {
    return this.http
      .get<any>(environment.apiUrl + "/unknown_faces?page=" + page)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  associatePerson(id: number, data) {
    return this.http
      .post<any>(
        environment.apiUrl + "/faces/" + id + "/associate_person",
        data
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/faces/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteMultiple(data) {
    let fQ = "";
    data.forEach((element, i) => {
      fQ += i === 0 ? "?" : "&";
      fQ += "face_ids[]=" + element;
    });
    return this.http
      .delete(environment.apiUrl + "/faces/bulk_destroy" + fQ)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  associatePersonMultiple(data) {
    return this.http
      .post<any>(
        environment.apiUrl + "/faces/bulk_associate_person",
        data
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
