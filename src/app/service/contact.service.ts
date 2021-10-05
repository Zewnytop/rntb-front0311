import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactObject} from "../../site-object/contact-object";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  getListContact(idBranch: number): Observable<DataObject> {
    const url = `/api/contact/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getContactBranch(idContact: number): Observable<DataSingleObject> {
    const url = `/api/contact/single/${idContact}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  createNewContact(idBranch: number): Observable<DataSingleObject> {
    const url = `/api/contact/newcontact/${idBranch}`;
    return this.httpClient.post<DataSingleObject>(url, null);
  }

  updateContact(contactOnBranch: ContactObject): Observable<DataSingleObject> {
    const url = `/api/contact/updatecontact`;
    return this.httpClient.put<DataSingleObject>(url, contactOnBranch);
  }

  deleteContact(idContact: number): Observable<DataSingleObject> {
    const url = `/api/contact/delete/${idContact}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }
}
