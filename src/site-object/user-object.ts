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
