import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {MenuObject} from "../../site-object/menu-object";

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

  getItemMenu(idItemMenu: number): Observable<DataSingleObject> {
    const url = `/api/menu/itemmenu/${idItemMenu}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getTypesItemMenu(): Observable<DataObject> {
    const url = `/api/menu/type`;
    return this.httpClient.get<DataObject>(url);
  }

  createItemMenu(idBranch: number, serialNumber: number, idParentItem: number | null): Observable<DataSingleObject> {
    const url = `/api/menu/new/item`;
    const body = {
      idBranch: idBranch,
      serialNumber: serialNumber,
      idParentItem: idParentItem
    };
    return this.httpClient.post<DataSingleObject>(url, body);
  }

  deleteItemMenu(idItem: number): Observable<DataSingleObject> {
    const url = `/api/menu/delete/${idItem}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }

  updatePositionItemMenu(listItemMenu: any[]): Observable<DataSingleObject> {
    const url = `/api/menu/change/order`;
    return this.httpClient.put<DataSingleObject>(url, listItemMenu);
  }

  updateItemsMenu(menuItem: Object): Observable<DataSingleObject> {
    const url = `/api/menu/updateitem`;
    return this.httpClient.put<DataSingleObject>(url, menuItem);
  }

}
