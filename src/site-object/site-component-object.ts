export interface SiteMenuObject {
  name: string,
  pageId: number,
  fileId: number,
  codeTypeItemMenu: string,
  childrenItem: SiteMenuObject[]
}

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

export interface SiteVirtualExhibitionObject {
  name: string,
  books: ViewBookVirtualExhibitionObject[]
}

export interface ViewBookVirtualExhibitionObject {
  idBook: number,
  idCoverImage: number
}

export interface SitePageObject {
  name: string,
  components: SitePageComponentObject[]
}

export interface SitePageComponentObject {
  idComponent: number,
  codeType: string
}

export interface SiteBook {
  author: string,
  name: string,
  isbn: string,
  description: string,
  idImageCover: number
}

export interface SiteLibraryBranch {
  name: string,
  city: string,
  domen: string
}
