import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactObject} from "../../site-object/contact-object";
import {DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  createNewContact(idBranch: number, newContact: Object): Observable<DataSingleObject> {
    const url = `/api/contact/newcontact/${idBranch}`;
    return this.httpClient.post<DataSingleObject>(url, newContact);
  }

  updateContact(contactOnBranch: ContactObject): Observable<DataSingleObject> {
    const url = `/api/contact/updatecontact`;
    return this.httpClient.put<DataSingleObject>(url, contactOnBranch);
  }
}
