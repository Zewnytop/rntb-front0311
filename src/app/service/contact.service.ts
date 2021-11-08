import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactObject} from "../../site-object/contact-object";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getListContact(idBranch: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getContactBranch(idContact: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/single/${idContact}`;
    return this.httpClient.get<DataSingleObject>(url, {headers: header});
  }

  createNewContact(idBranch: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/newcontact/${idBranch}`;
    return this.httpClient.post<DataSingleObject>(url, null, {headers: header});
  }

  createNewItertnalContact(idContact: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/newiternal/${idContact}`;
    return this.httpClient.post<DataSingleObject>(url, null, {headers: header});

  }

  updateContact(contactOnBranch: ContactObject): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/update`;
    return this.httpClient.put<DataSingleObject>(url, contactOnBranch, {headers: header});
  }

  updatePositionIternalContact(listPosition: any[]): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/change/order`;
    return this.httpClient.put<DataSingleObject>(url, listPosition, {headers: header});
  }

  deleteContact(idContact: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/delete/${idContact}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }

  deleteIternalContact(idIternalContact: number): Observable<DataSingleObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/contact/delete/iternal/${idIternalContact}`;
    return this.httpClient.delete<DataSingleObject>(url, {headers: header});
  }
}
