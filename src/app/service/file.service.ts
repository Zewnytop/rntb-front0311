import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
      return this.httpClient.get<file>(`/api/files/list`);
  }
}
