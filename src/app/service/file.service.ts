import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {DataObject, FileObject} from "../../site-object/file-object";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) {
  }

  getFiles(): Observable<DataObject> {
    const url = `/api/files/list`;
    return this.httpClient.get<DataObject>(url);
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const url = `/api/files/saveiamge`;
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
