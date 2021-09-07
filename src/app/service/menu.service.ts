import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) {
  }

  getMainitemsMenu(idBranch: number): Observable<DataObject> {
    const url = `/api/menu/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getNestedItemsMenu(idBranch: number, idItemMenu: number): Observable<DataObject> {
    const url = `/api/menu/nesteditems/${idBranch}/${idItemMenu}`;
    return this.httpClient.get<DataObject>(url);
  }

  updateVisibleItemMenu(idBranch: number, listItemMenu: any[]): Observable<any> {
    const url = `/api/menu/visible/${idBranch}`;
    return this.httpClient.put(url, listItemMenu);
  }
}
