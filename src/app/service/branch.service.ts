import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpClient: HttpClient) {
  }

  getListLibraryBranch(): Observable<DataObject> {
    const url = `/api/branch/list`;
    return this.httpClient.get<DataObject>(url);
  }

  getBranch(idBranch: number): Observable<DataSingleObject> {
    const url = `/api/branch/single/${idBranch}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  updateInfoLibararyBranch(body: Object): Observable<DataSingleObject> {
    const url = `/api/branch/update`;
    return this.httpClient.put<DataSingleObject>(url, body);
  }
}
