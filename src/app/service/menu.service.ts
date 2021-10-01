import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {MenuObject} from "../../site-object/menu-object";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _updatedMenuPoints: EventEmitter<DataObject> = new EventEmitter();

  get updatedMenuPoints(): EventEmitter<DataObject> {
    return this._updatedMenuPoints;
  }

  constructor(private httpClient: HttpClient) {
  }

  getMainitemsMenu(idBranch: number): Observable<DataObject> {
    const url = `/api/menu/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getMainitemMenu(idItemMenu: number): Observable<DataObject> {
    const url = `/api/menu/mainitem/${idItemMenu}`;
    return this.httpClient.get<DataObject>(url);
  }

  getNestedItemsMenu(idBranch: number, idItemMenu: number): Observable<DataObject> {
    const url = `/api/menu/nesteditems/${idBranch}/${idItemMenu}`;
    return this.httpClient.get<DataObject>(url);
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

  deleteItemMenu(idItem: number): Observable<DataSingleObject>{
    const url = `/api/menu/delete/${idItem}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }

  updateVisibleItemMenu(idBranch: number, listItemMenu: any[]): Observable<DataObject> {
    const url = `/api/menu/visible/${idBranch}`;
    return this.httpClient.put<DataObject>(url, listItemMenu);
  }

  updateItemsMenu(idBranch: number, listItemMenu: any[]): Observable<DataObject> {
    const url = `/api/menu/updateitem/${idBranch}`;
    return this.httpClient.put<DataObject>(url, listItemMenu);
  }

}
