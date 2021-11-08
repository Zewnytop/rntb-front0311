import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class VirtualExhibitionService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getCategories(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getBooksCategory(idCategory: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/list/book/${idCategory}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getCategory(idCategory: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/single/${idCategory}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  createCategory(idBranch: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/new`;
    return this.httpClient.post<DataSingleObject>(url, idBranch, {headers: header});
  }

  updateCategory(updatedCategory: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/update`;
    return this.httpClient.put<DataSingleObject>(url, updatedCategory, {headers: header});
  }

  addBookInCategory(idCategory: number, idBook: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/addbook/${idCategory}/${idBook}`;
    return this.httpClient.put<DataSingleObject>(url, null, {headers: header});
  }

  changePosition(listPosition: any[]): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/position`;
    return this.httpClient.put<DataSingleObject>(url, listPosition, {headers: header});
  }

  unhookBook(idBook: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/unhook/${idBook}`;
    return this.httpClient.put<DataSingleObject>(url, null, {headers: header});
  }

  deleteCategory(idCategory: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/category/remove/${idCategory}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }

}
