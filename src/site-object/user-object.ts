import {LibraryBranchObject} from "./libraryBranch-object";

export interface UserStoreObject {
  id: number,
  fio: string,
  role: UserRoleStoreObject,
  libraryBranch: LibraryBranchStoreObject
}

export interface UserRoleStoreObject {
  id: number,
  name: string,
  code: string,
  description: string
}

export interface LibraryBranchStoreObject {
  id: number,
  city: string,
  name: string
}

export interface UserObject {
  id: number | null,
  login: string | null,
  password: string | null,
  fio: string | null,
  branchAccess: boolean | null,
  isEdit: boolean,
  role: UserRoleStoreObject | null,
  libraryBranch: LibraryBranchStoreObject | null
}
