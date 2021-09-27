import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {Observable} from "rxjs";
import {DestinationObject, FileObject, SelectedFileObject} from "../../site-object/file-object";

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

  getTypesDestination(): Observable<DataObject> {
    const url = `/api/files/list/destination`;
    return this.httpClient.get<DataObject>(url);
  }

  uploadFile(selectFile: SelectedFileObject, branch: number): Observable<HttpEvent<any>> {
    const url = `/api/files/savefile/${branch}`;
    const formData: FormData = new FormData();
    formData.append('file', selectFile.file);
    formData.append('destination', selectFile.destination.idTypeDestination.toString());
    // formData.append('type', file.type);
    // formData.append('size', file.size.toString());
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      // responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  changeTypesDestination(viewFile: FileObject ): Observable<DataSingleObject> {
    const url = `/api/files/destination`;
    return this.httpClient.put<DataSingleObject>(url, viewFile);
  }

  getSingleFile(idFile: number): Observable<DataSingleObject> {
    const url = `/api/files/single/${idFile}`;
    return this.httpClient.get<DataSingleObject>(url);
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
