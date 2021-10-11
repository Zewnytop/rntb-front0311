export interface ContactObject {
  id: number | null,
  nameRu: string | null,
  nameEn: string | null,
  nameKz: string | null,
  addressRu: string | null,
  addressEn: string | null,
  addressKz: string | null,
  email: string | null,
  phoneNumber: string | null,
  map: string | null,
  lastModifiedDate: string | null,
  mainContact: boolean | null,
  iternalContact: InternalContactObject[]
}

export interface InternalContactObject {
  id: number | null,
  postRu: string | null,
  postEn: string | null,
  postKz: string | null,
  fioRu: string | null,
  fioEn: string | null,
  fioKz: string | null,
  phoneNumber: string | null,
  serialNumber: number | null
}

export interface ViewContactObject {
  id: number,
  name: string | null,
  lastModifiedDate: string | null,
  mainContact: boolean
}

// export interface NewInternalContactObject {
//   postRu: string | null,
//   postEn: string | null,
//   postKz: string | null,
//   fioRu: string | null,
//   fioEn: string | null,
//   fioKz: string | null,
//   phoneNumber: string | null
// }

