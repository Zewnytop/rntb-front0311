import {TypeComponentObject} from "./typeComponent-object";
import {LibraryBranchObject} from "./libraryBranch-object";
import {FileObject} from "./file-object";

export interface ViewBookObject {
  id: number,
  name: string,
  lastModifiedDate: string
}

export interface BookObject {
  id: number,
  authorRu: string,
  authorEn: string,
  authorKz: string,
  nameBookRu: string,
  nameBookEn: string,
  nameBookKz: string,
  isbn: string,
  descriptionRu: string,
  descriptionEn: string,
  descriptionKz: string,
  lastModifiedDate: string,
  serialNumber: number,
  typeComponent: TypeComponentObject,
  libraryBranch: LibraryBranchObject,
  file: FileObject | null
}


// id: number | null,
//   authorRu: string | null,
//   authorEn: string | null,
//   authorKz: string | null,
//   nameRu: string | null,
//   nameEn: string | null,
//   nameKz: string | null,
//   isbn: string | null,
//   descriptionRu: string | null,
//   descriptionEn: string | null,
//   descriptionKz: string | null,
//   lastModifiedDate: string | null,
//   typeComponent: TypeComponentObject | null,
//   libraryBranch: LibraryBranchObject | null,
//   file: FileObject | null
