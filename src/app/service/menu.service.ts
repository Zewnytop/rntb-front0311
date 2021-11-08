import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {MenuObject} from "../../site-object/menu-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getMainitemsMenu(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getItemMenu(idItemMenu: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/itemmenu/${idItemMenu}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  getTypesItemMenu(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/type`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  createItemMenu(idBranch: number, idParentItem: number | null): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/new/item`;
    const body = {
      idBranch: idBranch,
      idParentItem: idParentItem
    };
    return this.httpClient.post<DataSingleObject>(url, body, {headers: header});
  }

  deleteItemMenu(idItem: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/delete/${idItem}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }

  updatePositionItemMenu(listItemMenu: any[]): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/change/order`;
    return this.httpClient.put<DataSingleObject>(url, listItemMenu, {headers: header});
  }

  updateItemsMenu(menuItem: Object): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/menu/updateitem`;
    return this.httpClient.put<DataSingleObject>(url, menuItem, {headers: header});
  }

}
