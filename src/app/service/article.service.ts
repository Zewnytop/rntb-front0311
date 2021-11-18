import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getListTypeArticle(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/list/type`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getListArticle(idBranch: number, typeId: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/list/${idBranch}/${typeId}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getArticles(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/alllist/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getArticle(idArticle: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/single/${idArticle}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getFileArticle(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/file/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  createArticle(idBranch: number, typeId: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/new/${idBranch}/${typeId}`;
    return this.httpClient.post<DataSingleObject>(url, null, {headers: header});
  }

  updateArticle(updatedArticle: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/update`;
    return this.httpClient.put<DataSingleObject>(url, updatedArticle, {headers: header});
  }

  deleteArticle(idArticle: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/article/remove/${idArticle}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }
}
