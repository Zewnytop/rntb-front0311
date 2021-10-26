import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

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

  getPage(idPage: number): Observable<DataSingleObject> {
    const url = `/api/build/page/single/${idPage}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  addComponentOnpage(component: Object): Observable<DataSingleObject> {
    const url = `/api/build/page/add/component`;
    return this.httpClient.post<DataSingleObject>(url, component);
  }

  deleteComponentOnPage(idComponent: number): Observable<DataSingleObject> {
    const url = `/api/build/page/remove/${idComponent}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }

  updatePositionComponentOnPage(listPosition: any[]): Observable<DataSingleObject> {
    const url = `/api/build/page/position`;
    return this.httpClient.put<DataSingleObject>(url, listPosition);
  }

}
