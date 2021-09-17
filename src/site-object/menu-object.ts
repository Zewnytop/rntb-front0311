export interface MenuObject {
  idItemMenuOnBranch: number,
  idItemMenu: number,
  showItem: boolean,
  indexNumber: number,
  nameRu: string,
  nameEn: string,
  nameKz: string,
  routeLink: string,
  description: string,
  lastModifiedDate: string,
  typeItemMenu: TypeMenuObject
}

export interface TypeMenuObject {
  id: number,
  nameType: string,
  codeType: string,
  description: string
}

export interface ListContactObject {
  id: number,
  nameRu: string,
  nameEn: string,
  nameKz: string
}
