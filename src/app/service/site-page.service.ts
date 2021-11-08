import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class SitePageService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getSiteMenu(domenBranch: String, lang: string | null): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/menu/${domenBranch}/${lang}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getNameBranch(domenBranch: String, lang: string | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/name/${domenBranch}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getContact(idContact: number, lang: string | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/contact/${idContact}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getCategoriesVirtualExhibition(idCategory: number, lang: string | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/category/${idCategory}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getPage(idPage: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/page/${idPage}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getBook(idBook: number, lang: string | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/book/${idBook}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getArticle(idArticle: number, lang: string | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/article/${idArticle}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getLibraryBranches(lang: string | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/site/branch/${lang}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }
}
