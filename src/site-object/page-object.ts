import {TypeComponentObject} from "./typeComponent-object";

export interface PageObject {
  id: number | null,
  name: string | null,
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

export interface ViewPages {
  id: number,
  name: string,
  isEdit: boolean
}
