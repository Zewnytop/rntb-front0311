import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getUserStore(login: string): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/store/${login}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getListUser(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getUser(idUser: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/single/${idUser}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  createUser(user: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/new`;
    return this.httpClient.post<DataSingleObject>(url, user, {headers: header});
  }

  updateUser(user: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/update`;
    return this.httpClient.put<DataSingleObject>(url, user, {headers: header});
  }

  changePassword(password: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/pass`;
    return this.httpClient.put<DataSingleObject>(url, password, {headers: header});
  }

  deleteUser(idUser: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/user/remove/${idUser}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }

}
