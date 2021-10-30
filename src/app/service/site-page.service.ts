import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class SitePageService {

  constructor(private httpClient: HttpClient) {
  }

  getSiteMenu(domenBranch: String, lang: string | null): Observable<DataObject> {
    const url = `/api/site/menu/${domenBranch}/${lang}`;
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

  getPage(idPage: number): Observable<DataSingleObject> {
    const url = `/api/site/page/${idPage}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getBook(idBook: number, lang: string | null): Observable<DataSingleObject> {
    const url = `/api/site/book/${idBook}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }
}
