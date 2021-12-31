import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class VideoService {
  constructor(private http: HttpClient) {}

  getAll(page = 1, filter = "") {
    return this.http
      .get<any>(
        environment.apiUrl + "/videos?page=" + page + "&filter=" + filter
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiUrl + "/videos/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("source", data.source);
    formData.append("network_drive_id", data.network_drive_id);
    data.videos.forEach((element) => {
      formData.append("clip[]", element.clip, element.fileName);
    });
    return this.http.post<any>(environment.apiUrl + "/videos/", formData).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http
      .put<any>(environment.apiUrl + "/videos/" + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/videos/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  log(page = 1, id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/videos/" + id + "/logs?page=" + page)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteMultiple(ids) {
    let fQ = "";
    ids.forEach((element, i) => {
      fQ += i === 0 ? "?" : "&";
      fQ += "video_ids[]=" + element;
    });
    return this.http
      .delete(environment.apiUrl + "/videos/bulk_destroy" + fQ)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  download(id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/videos/" + id + "/download", {
        observe: "response",
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  analyze(id: number) {
    return this.http
      .post<any>(environment.apiUrl + "/videos/" + id + "/analyze", {})
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAnalyzedDetail(id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/videos/" + id + "/analyzed")
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deletePerson(id: number) {
    return this.http.delete(environment.apiUrl + "/faces/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
