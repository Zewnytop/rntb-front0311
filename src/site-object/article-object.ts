import {TypeComponentObject} from "./typeComponent-object";
import {LibraryBranchObject} from "./libraryBranch-object";
import {FileObject} from "./file-object";

export interface ArticleObject {
  id: number,
  topicRu: string,
  topicEn: string,
  topicKz: string,
  titleRu: string,
  titleEn: string,
  titleKz: string,
  mainTextRu: string,
  mainTextEn: string,
  mainTextKz: string,
  lastModifiedDate: string,
  showOnPage: boolean,
  typeComponent: TypeComponentObject,
  typeArticle: TypeArticleObject,
  libraryBranch: LibraryBranchObject,
  file: FileObject | null
}

export interface ViewArticleObject {
  id: number,
  name: string,
  lastModifiedDate: string,
  showOnPage: boolean,
  typeComponent: TypeComponentObject,
  typeArticle: TypeArticleObject,
}

export interface TypeArticleObject {
  id: number,
  nameType: string,
  codeType: string,
  description: string
}
