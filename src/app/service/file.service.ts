import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {DataObject, DataSingleObject} from "../../site-object/data-object";
import {Observable} from "rxjs";
import {DestinationObject, FileObject, SelectedFileObject} from "../../site-object/file-object";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  getFiles(branch: number, idType: number): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/files/list/${branch}/${idType}`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  getTypesDestination(): Observable<DataObject> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/files/list/destination`;
    return this.httpClient.get<DataObject>(url, {headers: header});
  }

  uploadFile(selectFile: SelectedFileObject, branch: number): Observable<HttpEvent<any>> {
    const header = new HttpHeaders({
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/files/savefile/${branch}`;
    const formData: FormData = new FormData();
    formData.append('file', selectFile.file);
    formData.append('destination', selectFile.destination.idTypeDestination.toString());
    // formData.append('type', file.type);
    // formData.append('size', file.size.toString());
    let req = new HttpRequest('POST', url, formData, {
      headers: header,
      reportProgress: true,
      // responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  // changeTypesDestination(viewFile: FileObject ): Observable<DataSingleObject> {
  //   const url = `/api/files/destination`;
  //   return this.httpClient.put<DataSingleObject>(url, viewFile);
  // }

  // getSingleFile(idFile: number): Observable<DataSingleObject> {
  //   const url = `/api/files/single/${idFile}`;
  //   return this.httpClient.get<DataSingleObject>(url);
  // }

  deleteFile(id: number): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/files/delete/${id}`;
    return this.httpClient.delete(url, {headers: header});
  }

  getFile(id: number): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookieService.getCookie()!
    });
    const url = `/api/files/get/${id}`;
    return this.httpClient.get(url, {headers: header});
  }
}
