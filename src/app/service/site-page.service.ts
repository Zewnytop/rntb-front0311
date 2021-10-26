import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class SitePageService {

  constructor(private httpClient: HttpClient) {
  }

  getContact(idContact: number | null, lang: string): Observable<DataSingleObject> {
    const url = `/api/site/contact/${idContact}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getCategoriesVirtualExhibition(idCategory: number, lang: string): Observable<DataSingleObject> {
    const url = `/api/site/category/${idCategory}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }
}
