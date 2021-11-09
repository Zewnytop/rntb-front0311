export interface LibraryBranchObject {
  id: number,
  nameRu: string,
  nameEn: string,
  nameKz: string,
  domen: string,
  cityRu: string,
  cityEn: string,
  cityKz: string,
  showOnPage: boolean
}

export interface LocalizationObject {
  id: number,
  nameLanguage: string,
  code: string,
  enableLanguage: boolean
}
