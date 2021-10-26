export interface SiteContactObject {
  nameContact: string | null,
  address: string,
  email: string,
  phoneNumber: string,
  navigationMap: string
  iternalContacts: SiteIternalContactObject[]
}

export interface SiteIternalContactObject {
  position: string,
  fio: string,
  phoneNumber: string
}

export interface VirtualExhibitionObject {
  name: string,
  books: ViewBookVirtualExhibitionObject[]
}

export interface ViewBookVirtualExhibitionObject {
  idBook: number,
  idCoverImage: number
}
