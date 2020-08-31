import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
  apiUrl = environment.apiUrl + "/";
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * loads the data from respective api url.
   * @param api
   * @param filter
   * @param sortOrder
   * @param pageNumber
   * @param pageSize
   * @param activeCol
   */

  getAllData(
    api = "",
    search = "",
    pageNumber = 0,
  ): Observable<any[]> {
    return this.http
      .get<any>(this.apiUrl + api, {
        params: new HttpParams()
          .set("search", search)
          .set("page", (pageNumber + 1).toString())
      }).pipe(map(res => { return res}));
  }
}
