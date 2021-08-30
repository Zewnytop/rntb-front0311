import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {file} from "../../site-object/file-object";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) {
  }

  getFiles(): Observable<file> {
    const url = `/api/files/list`;
    return this.httpClient.get(url);
  }

  upload(file: File): Observable<HttpEvent<any>> {
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

  saveFile(file: string | ArrayBuffer | null) {
    // const url = `/api/files/list`;
    console.log("post")
    const text = "file";
    this.httpClient.post(`/api/files/saveiamge`, text);

  }
}
