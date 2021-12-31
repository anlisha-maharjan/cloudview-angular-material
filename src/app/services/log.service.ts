import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class LogService {
  constructor(private http: HttpClient) {}

  getLog(data) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/logs?event_type=" +
          data.type +
          "&date=" +
          data.date
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
