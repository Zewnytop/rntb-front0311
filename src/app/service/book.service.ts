import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getBooks(idBranch: number): Observable<DataObject> {
    const url = `/api/book/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getBook(idBook: number): Observable<DataSingleObject> {
    const url = `/api/book/single/${idBook}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  createBook(idBranch: number): Observable<DataSingleObject> {
    const url = `/api/book/new`;
    return this.httpClient.post<DataSingleObject>(url, idBranch);
  }

  deleteBook(idBook: number): Observable<DataSingleObject> {
    const url = `/api/book/delete/${idBook}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }
}
