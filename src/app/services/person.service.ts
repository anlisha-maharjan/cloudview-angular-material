import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<any>(environment.apiUrl + "/people/").pipe(
      map((response) => {
        return response;
      })
    );
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiUrl + "/people/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  create(data) {
    return this.http.post<any>(environment.apiUrl + "/people/", data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(data) {
    return this.http
      .put<any>(environment.apiUrl + "/people/" + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/people/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  log(page = 1, id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/people/" + id + "/logs?page=" + page)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  train(id: number) {
    return this.http
      .put<any>(environment.apiUrl + "/people/" + id + "/train", {})
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  trainMultiple(ids) {
    let fQ = "";
    ids.forEach((element, i) => {
      fQ += i === 0 ? "?" : "&";
      fQ += "person_ids[]=" + element;
    });
    return this.http
      .post(environment.apiUrl + "/people/bulk_train" + fQ, {})
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  addImages(id: number, attachments) {
    const formData = new FormData();
    attachments.forEach((element) => {
      formData.append("image[]", element.file, element.fileName);
    });
    return this.http
      .put<any>(environment.apiUrl + "/people/" + id + "/add_images/", formData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getImages(id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/people/" + id + "/images")
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteImage(personId: number, imageId: number) {
    return this.http
      .delete(
        environment.apiUrl + "/people/" + personId + "/person_images/" + imageId
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
