export interface FileObject {
  id: number,
  nameFile: string,
  typeFile: string,
  createdDate: string,
  destination: DestinationObject
}

export interface DestinationObject {
  idTypeDestination: number,
  nameDestination: string,
  codeDestination: string,
  description: string
}

export interface ViewDestinationObject {
  idTypeDestination: number,
  nameDestination: string,
  isOpen: boolean,
  isEdit: boolean,
  files: FileObject[]
}

export interface SelectedFileObject {
  file: File,
  destination: DestinationObject
}

