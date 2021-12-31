import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  getAll(page = 1, data) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches?page=" +
          page +
          "&filter_params[start_time]=" +
          data.start_time +
          "&filter_params[end_time]=" +
          data.end_time +
          "&filter_params[source_id]=" +
          data.source_id +
          "&filter_params[person_id]=" +
          data.person_id
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
    /*let sQ = "";
    let pQ = "";
    if (data.source_id) {
      data.source_id.forEach((element) => {
        sQ += "&source_id[]=" + element;
      });
    }

    if (data.person_id) {
      data.person_id.forEach((element) => {
        pQ += "&person_id[]=" + element;
      });
    }

    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches?start_time=" +
          data.start_time +
          "&end_time=" +
          data.end_time +
          sQ +
          pQ
      )
      .pipe(
        map((response) => {
          return response;
        })
      );*/
  }

  getAllUnknown(page = 1, start_time, end_time, source_id, person_id) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches/unknown?page=" +
          page +
          "&filter_params[start_time]=" +
          start_time +
          "&filter_params[end_time]=" +
          end_time +
          "&filter_params[source_id]=" +
          source_id +
          "&filter_params[person_id]=" +
          person_id
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSearchByPeople(
    page = 1,
    personId: number,
    start_time,
    end_time,
    source_id,
    person_id
  ) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches/people/" +
          personId +
          "?page=" +
          page +
          "&filter_params[start_time]=" +
          start_time +
          "&filter_params[end_time]=" +
          end_time +
          "&filter_params[source_id]=" +
          source_id +
          "&filter_params[person_id]=" +
          person_id
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSearchPeopleBySource(
    page = 1,
    personId: number,
    source,
    sourceId: number
  ) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches/people/" +
          personId +
          "/" +
          source +
          "/" +
          sourceId +
          "?page=" +
          page
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSearchPeopleByVisitCount(
    personId: number,
    cameraId: number,
    visitCountValue
  ) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches/people/" +
          personId +
          "/cameras/" +
          cameraId +
          "/clips?visit_count=" +
          visitCountValue
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

  getSearchPeopleByVideoCameras(personId: number) {
    return this.http
      .get<any>(environment.apiUrl + "/searches/cameras?person_id=" + personId)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSearchPeopleByVideoFiles(personId: number, page = 1) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches/videos?person_id=" +
          personId +
          "&page=" +
          page
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSearchPeopleByNetworkDrives(personId: number) {
    return this.http
      .get<any>(
        environment.apiUrl + "/searches/network_drives?person_id=" + personId
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getVideoCameraDetail(personId: number, cameraId: number, page = 1) {
    return this.http
      .get<any>(
        environment.apiUrl + "/searches/cameras/" + cameraId + "?page=" + page
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getNetworkDriveFolderDetail(personId: number, folderId: number, page = 1) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/searches/network_drive/folder_detail?folder_id=" +
          folderId +
          "&page=" +
          page
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
