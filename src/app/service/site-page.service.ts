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

  getContact(id: number | null, lang: string): Observable<DataSingleObject> {
    const url = `/api/site/contact/${id}/${lang}`;
    return this.httpClient.get<DataSingleObject>(url);
  }
}
