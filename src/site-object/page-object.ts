import {TypeComponentObject} from "./typeComponent-object";

export interface PageObject {
  id: number | null,
  nameRu: string | null,
  nameEn: string | null,
  nameKz: string | null,
  lastModifiedDate: string | null,
  components: PageComponentObject[]
}

export interface PageComponentObject {
  id: number,
  idComponent: number,
  name: string,
  typeComponent: TypeComponentObject,
  serialNumber: number
}

export interface ViewPageObject {
  id: number,
  nameRu: string,
  nameEn: string,
  nameKz: string,
  isEdit: boolean
}

export interface MapBranchObject {
  id: number,
  name: string,
  typeComponent: TypeComponentObject
}
