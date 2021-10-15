import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class VirtualExhibitionService {

  constructor(private httpClient: HttpClient) {
  }

  getCategories(idBranch: number): Observable<DataObject> {
    const url = `/api/category/list/${idBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  getBooksCategory(idCategory: number): Observable<DataSingleObject> {
    const url = `/api/category/list/book/${idCategory}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getCategory(idCategory: number): Observable<DataSingleObject> {
    const url = `/api/category/single/${idCategory}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  createCategory(idBranch: number): Observable<DataSingleObject> {
    const url = `/api/category/new`;
    return this.httpClient.post<DataSingleObject>(url, idBranch);
  }

  updateCategory(updatedCategory: Object): Observable<DataSingleObject> {
    const url = `/api/category/update`;
    return this.httpClient.put<DataSingleObject>(url, updatedCategory);
  }

  addBookInCategory(idCategory: number, idBook: number): Observable<DataSingleObject> {
    const url = `/api/category/addbook/${idCategory}/${idBook}`;
    return this.httpClient.put<DataSingleObject>(url, null);
  }

  changePosition(listPosition: any[]): Observable<DataSingleObject> {
    const url = `/api/category/position`;
    return this.httpClient.put<DataSingleObject>(url, listPosition);
  }

  unhookBook(idBook: number): Observable<DataSingleObject> {
    const url = `/api/category/unhook/${idBook}`;
    return this.httpClient.put<DataSingleObject>(url, null);
  }

  deleteCategory(idCategory: number): Observable<DataSingleObject> {
    const url = `/api/category/remove/${idCategory}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }

}
