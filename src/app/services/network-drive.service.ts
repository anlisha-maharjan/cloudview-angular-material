import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class NetworkDriveService {
  constructor(private http: HttpClient) {}

  getAll(page = 1) {
    return this.http
      .get<any>(environment.apiUrl + "/network_drives?page=" + page)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getById(id: number) {
    return this.http
      .get<any>(environment.apiUrl + "/network_drives/" + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  create(data) {
    return this.http
      .post<any>(environment.apiUrl + "/network_drives/", data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(data) {
    return this.http
      .put<any>(environment.apiUrl + "/network_drives/" + data.id, data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/network_drives/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getFolder(networkDriveId: number, page = 1) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/network_drives/" +
          networkDriveId +
          "/folders?page=" +
          page
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getFolderById(networkDriveId: number, id: number) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/network_drives/" +
          networkDriveId +
          "/folders/" +
          id
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  createFolder(networkDriveId, data) {
    return this.http
      .post<any>(
        environment.apiUrl + "/network_drives/" + networkDriveId + "/folders",
        data
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updateFolder(networkDriveId, data) {
    return this.http
      .put<any>(
        environment.apiUrl +
          "/network_drives/" +
          networkDriveId +
          "/folders/" +
          data.id,
        data
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteFolder(networkDriveId, id: number) {
    return this.http
      .delete(
        environment.apiUrl +
          "/network_drives/" +
          networkDriveId +
          "/folders/" +
          id
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  analyzeFolder(networkDriveId: number, id: number) {
    return this.http
      .post(
        environment.apiUrl +
          "/network_drives/" +
          networkDriveId +
          "/folders/" +
          id +
          "/analyze",
        {}
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getFolderVideo(networkDriveId: number, id: number, page = 1, search = "") {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/network_drives/" +
          networkDriveId +
          "/folders/" +
          id +
          "/network_videos?page=" +
          page +
          "&search=" +
          search
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
