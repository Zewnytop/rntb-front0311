import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getParameters(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/parameter/list`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getParameter(idParameter: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/parameter/single/${idParameter}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  updateParameter(parameter: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/parameter/update`;
    return this.httpClient.put<DataSingleObject>(url, parameter, {headers: header});
  }
}
