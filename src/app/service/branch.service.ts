import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getListLibraryBranch(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/branch/list`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  addBranch(): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/branch/add`;
    return this.httpClient.post<DataSingleObject>(url, null, {headers: header});
  }

  getBranch(idBranch: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/branch/single/${idBranch}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  updateInfoLibararyBranch(body: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/branch/update`;
    return this.httpClient.put<DataSingleObject>(url, body, {headers: header});
  }

  getListLang(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/branch/lang`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  updateLang(body: any[]): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/branch/update/lang`;
    return this.httpClient.put<DataSingleObject>(url, body, {headers: header});
  }


  // deleteBranch(idBranch: number): Observable<DataSingleObject> {
  //   const header = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: this.cookieService.getCookie()!
  //   });
  //   const url = `/api/branch/remove/${idBranch}`;
  //   return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  // }
}
