import {TypeComponentObject} from "./typeComponent-object";

export interface PageObject {
  name: string | null
  lastModifiedDate: string | null,
  components: PageComponentsObject[]
}

export interface PageComponentsObject {
  id: number,
  typeComponent: TypeComponentObject,
  serialNumber: number
}

export interface ViewPages {
  id: number,
  name: string
}
