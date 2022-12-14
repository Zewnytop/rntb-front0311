import {FileObject} from "./file-object";
import {LibraryBranchObject} from "./libraryBranch-object";
import {TypeComponentObject} from "./typeComponent-object";
import {ViewPageObject} from "./page-object";

export interface MenuObject {
  id: number,
  showItem: boolean,
  serialNumber: number,
  nameRu: string,
  nameEn: string,
  nameKz: string,
  description: string,
  lastModifiedDate: string,
  isEdit: boolean,
  parentItem: MenuObject,
  file: FileObject,
  typeComponent: TypeComponentObject,
  libraryBranch: LibraryBranchObject,
  childerItemMenu: MenuObject[],
  typeItemMenu: TypeMenuItemObject
  page: ViewPageObject | null,
  linkResource: string
}

export interface TypeMenuItemObject {
  id: number,
  nameType: string,
  codeType: string,
  description: string
}
