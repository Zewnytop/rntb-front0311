import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataObject, DataSingleObject} from "../../site-object/data-object";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) {
  }

  getListTypeArticle(): Observable<DataObject> {
    const url = `/api/article/list/type`;
    return this.httpClient.get<DataObject>(url);
  }

  getListArticle(idBranch: number, typeId: number): Observable<DataObject> {
    const url = `/api/article/list/${idBranch}/${typeId}`;
    return this.httpClient.get<DataObject>(url);
  }

  getArticle(idArticle: number): Observable<DataSingleObject> {
    const url = `/api/article/single/${idArticle}`;
    return this.httpClient.get<DataSingleObject>(url);
  }

  getFileArticle(idBranch: number): Observable<DataObject> {
    const url = `/api/article/file/${idBranch}`;
    return this.httpClient.get<DataObject>(url);
  }

  createArticle(idBranch: number, typeId: number): Observable<DataSingleObject> {
    const url = `/api/article/new/${idBranch}/${typeId}`;
    return this.httpClient.post<DataSingleObject>(url, null);
  }

  updateArticle(updatedArticle: Object): Observable<DataSingleObject>{
    const url = `/api/article/update`;
    return this.httpClient.put<DataSingleObject>(url, updatedArticle);
  }

  deleteArticle(idArticle: number): Observable<DataSingleObject> {
    const url = `/api/article/remove/${idArticle}`;
    return this.httpClient.delete<DataSingleObject>(url);
  }
}
