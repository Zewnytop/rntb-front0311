import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getMapBranch(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/map`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  createPage(idBranch: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/new/${idBranch}`;
    return this.httpClient.post<DataSingleObject>(url, null, {headers: header});
  }

  getListPage(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getPage(idPage: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/single/${idPage}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  addComponentOnpage(component: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/add/component`;
    return this.httpClient.post<DataSingleObject>(url, component, {headers: header});
  }

  deleteComponentOnPage(idComponent: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/remove/${idComponent}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }

  updatePositionComponentOnPage(listPosition: any[]): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/position`;
    return this.httpClient.put<DataSingleObject>(url, listPosition, {headers: header});
  }

  updateInfoPage(idPage: number, page: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/newname/${idPage}`;
    return this.httpClient.put<DataSingleObject>(url, page, {headers: header});
  }

  deletePage(idPage: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/delete/${idPage}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }

  getListTypeComponent(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/build/page/list/type`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }
}
