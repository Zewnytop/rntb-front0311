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

  getLanguages(): Observable<DataObject> {
    const url = `/api/site/localization`;
    return this.httpClient.get<DataObject>(url);
  }

  getSiteMenu(domenBranch: String, lang: string | null): Observable<DataObject> {
    const url = `/api/site/menu/${domenBranch}/${lang}`;
    return this.httpClient.get<DataObject>(url);
  }

  getSiteStaticMenu(lang: string | null): Observable<DataObject>{
    const url = `/api/site/static/menu/${lang}`;
    return this.httpClient.get<DataObject>(url);
  }

  getNameBranch(domenBranch: String, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/name/${domenBranch}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getContact(idContact: number, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/contact/${idContact}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getCategoriesVirtualExhibition(idCategory: number, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/category/${idCategory}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getPage(idPage: number,lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/page/${idPage}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getBook(idBook: number, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/book/${idBook}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getArticle(idArticle: number, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/article/${idArticle}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getNew(domenBranch: String): Observable<DataObject> {
    const url = `/api/site/news/${domenBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getLastBook(domenBranch: String): Observable<DataObject> {
    const url = `/api/site/lastbook/${domenBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getMainComponent(domenBranch: String, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/main/contact/${domenBranch}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getParameters(): Observable<DataObject>{
    const url = `/api/site/parameter`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getLibraryBranches(lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/branch/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getNamePageForArticle(idPage: number, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/namepage/${idPage}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

}
