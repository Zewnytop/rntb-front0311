export interface ContactObject {
    id: number | null,
    nameRu: string | null,
    nameEn: string | null,
    nameKz: string | null,
    address: string | null,
    email: string | null,
    phoneNumber: string | null,
    map: string | null,
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
    phoneNumber: string | null
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

