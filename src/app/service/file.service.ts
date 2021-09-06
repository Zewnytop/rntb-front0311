import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {DataObject} from "../../site-object/data-object";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) {
  }

  getFiles(branch: number): Observable<DataObject> {
    const url = `/api/files/list/${branch}`;
    return this.httpClient.get<DataObject>(url);
  }

  uploadFile(file: File, user: number): Observable<HttpEvent<any>> {
    const url = `/api/files/savefile/${user}`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('type', file.type);
    formData.append('size', file.size.toString());
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      // responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  deleteFile(id: number): Observable<any> {
    const url = `/api/files/delete/${id}`;
    return this.httpClient.delete(url);
  }

  getFile(id: number): Observable<any> {
    const url = `/api/files/get/${id}`;
    return this.httpClient.get(url);
  }
}
