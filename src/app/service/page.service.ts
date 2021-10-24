import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private httpClient: HttpClient) {
  }

  getListPage(idBranch: number): Observable<DataObject> {
    const url = `/api/build/page/list`;
    return this.httpClient.get<DataObject>(url);
  }

}
