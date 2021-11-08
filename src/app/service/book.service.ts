import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getBooks(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/book/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getBook(idBook: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/book/single/${idBook}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getFiles(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/book/covers/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  createBook(idBranch: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/book/new`;
    return this.httpClient.post<DataSingleObject>(url, idBranch, {headers: header});
  }

  updateBook(updateBook: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/book/update`;
    return this.httpClient.put<DataSingleObject>(url, updateBook, {headers: header});
  }

  deleteBook(idBook: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/book/delete/${idBook}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }
}
