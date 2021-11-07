import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUser(login: string): Observable<DataSingleObject> {
    const url = `/api/user/store/${login}`;
    return this.httpClient.get<DataSingleObject>(url);
  }
}
