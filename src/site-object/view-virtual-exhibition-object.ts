import {TypeComponentObject} from "./typeComponent-object";
import {LibraryBranchObject} from "./libraryBranch-object";
import {BookObject} from "./book-object";

export interface ViewVirtualExhibitionObject {
  id: number,
  nameRu: string,
  nameEn: string,
  nameKz: string,
  isEdit: boolean,
  lastModifiedDate: string,
  typeComponent: TypeComponentObject,
  libraryBranch: LibraryBranchObject
}

export interface VirtualExhibitionObject {
  id: number,
  nameRu: string,
  nameEn: string,
  nameKz: string,
  isEdit: boolean,
  lastModifiedDate: string,
  books: BookObject[],
  typeComponent: TypeComponentObject,
  libraryBranch: LibraryBranchObject,
}
