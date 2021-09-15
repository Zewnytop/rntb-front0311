import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactObject} from "../../site-object/contact-object";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  createNewContact(idBranch: number, newContact: Object): Observable<any> {
    const url = `/api/contact/newcontact/${idBranch}`;
    return this.httpClient.post(url, newContact);
  }

  updateContact(contactOnBranch: ContactObject): Observable<any> {
    const url = `/api/contact/updatecontact`;
    return this.httpClient.put(url, contactOnBranch);
  }
}
