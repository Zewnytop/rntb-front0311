import {Component, OnInit} from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @ts-ignore
import * as CustomEditor from '../../ckeditor5custom/build/ckeditor';
import {ArticleService} from "../service/article.service";
import {ArticleObject, TypeArticleObject, ViewArticleObject} from "../../site-object/article-object";
import {TypeComponentObject} from "../../site-object/typeComponent-object";
import {LibraryBranchObject} from "../../site-object/libraryBranch-object";
import {DestinationObject, FileObject, SelectedFileObject, ViewDestinationObject} from "../../site-object/file-object";
import {FileService} from "../service/file.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  public Editor = CustomEditor;
  private _listViewArticle: ViewArticleObject[] = [];
  private _listTypeAticle: TypeArticleObject[] = [];
  private _listViewFile: FileObject[] = [];
  private _listViewFolder: ViewDestinationObject[] = [];
  private _listDestination: DestinationObject[] = [];
  private _selectedTypeArticle: TypeArticleObject | null = null;
  private _selectedArticle: ArticleObject | null = null;
  private _lang: string = "ru";
  private _close: boolean = false;
  private _edit: boolean = false;


  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }

  get close(): boolean {
    return this._close;
  }

  set close(value: boolean) {
    this._close = value;
  }

  get listViewArticle(): ViewArticleObject[] {
    return this._listViewArticle;
  }

  set listViewArticle(value: ViewArticleObject[]) {
    this._listViewArticle = value;
  }

  get listTypeAticle(): TypeArticleObject[] {
    return this._listTypeAticle;
  }

  set listTypeAticle(value: TypeArticleObject[]) {
    this._listTypeAticle = value;
  }

  get listViewFile(): FileObject[] {
    return this._listViewFile;
  }

  set listViewFile(value: FileObject[]) {
    this._listViewFile = value;
  }

  get listViewFolder(): ViewDestinationObject[] {
    return this._listViewFolder;
  }

  set listViewFolder(value: ViewDestinationObject[]) {
    this._listViewFolder = value;
  }

  get listDestination(): DestinationObject[] {
    return this._listDestination;
  }

  set listDestination(value: DestinationObject[]) {
    this._listDestination = value;
  }

  get selectedTypeArticle(): TypeArticleObject | null {
    return this._selectedTypeArticle;
  }

  set selectedTypeArticle(value: TypeArticleObject | null) {
    this._selectedTypeArticle = value;
  }

  get selectedArticle(): ArticleObject | null {
    return this._selectedArticle;
  }

  set selectedArticle(value: ArticleObject | null) {
    this._selectedArticle = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  constructor(private articleService: ArticleService, private fileService: FileService) {
  }

  ngOnInit(): void {
    this.getFileTypesDestionation();
    this.getListTypeAticle();
    // this.getFiles();
  }

  log(): void {
    console.log(this.listTypeAticle);
    console.log(this.selectedTypeArticle);
    console.log(this.selectedArticle);
  }




  getListTypeAticle(): void {
    this.articleService.getListTypeArticle().subscribe(data => {
      data.result.forEach(item => {
        this.listTypeAticle.push({
          id: item.id,
          nameType: item.nameType,
          codeType: item.codeType,
          description: item.description
        });
      });
      this.selectedTypeArticle = this.listTypeAticle[0];
      this.getListArticle();
    }, error => {
      console.log(error);
    });
  }

  getListArticle(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.listViewArticle = [];
    this.articleService.getArticles(idBranch).subscribe(data => {
      data.result.forEach(item => {
        this.listViewArticle.push({
          id: item.id,
          name: item.name,
          lastModifiedDate: item.lastModifiedDate,
          showOnPage: item.showOnPage,
          typeComponent: item.typeComponent,
          typeArticle: item.typeArticle
        });
      })
    }, error => {
      console.log(error);
    });
  }

  createArticle(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.articleService.createArticle(idBranch, this.selectedTypeArticle!.id).subscribe(data => {
      const newArticle = data.result;
      this.listViewArticle.unshift({
        id: newArticle.id,
        name: newArticle.topicRu,
        lastModifiedDate: newArticle.lastModifiedDate,
        showOnPage: newArticle.showOnPage,
        typeComponent: newArticle.typeComponent,
        typeArticle: newArticle.typeArticle
      });
      this.selectedArticle = newArticle;
    }, error => {
      console.log(error);
    });
  }

  getArticle(idArticle: number): void {
    this.articleService.getArticle(idArticle).subscribe(data => {
      this.selectedArticle = data.result;
    }, error => {
      console.log(error);
    });
  }

  updateArticle(): void {
    const body = {
      id: this.selectedArticle?.id,
      topicRu: this.selectedArticle?.topicRu,
      topicEn: this.selectedArticle?.topicEn,
      topicKz: this.selectedArticle?.topicKz,
      titleRu: this.selectedArticle?.titleRu,
      titleEn: this.selectedArticle?.titleEn,
      titleKz: this.selectedArticle?.titleKz,
      mainTextRu: this.selectedArticle?.mainTextRu,
      mainTextEn: this.selectedArticle?.mainTextEn,
      mainTextKz: this.selectedArticle?.mainTextKz,
      showOnPage: this.selectedArticle?.showOnPage,
      fileId: this.selectedArticle?.file?.id,
      typeId: this.selectedArticle?.typeArticle?.id
    };
    this.articleService.updateArticle(body).subscribe(data => {
      const itemViewArticle = this.listViewArticle.filter(item => item.id === this.selectedArticle?.id)[0];
      itemViewArticle.name = data.result.name;
      itemViewArticle.lastModifiedDate = data.result.lastModifiedDate;
      itemViewArticle.showOnPage = data.result.showOnPage;
      itemViewArticle.typeArticle = data.result.typeArticle;
    }, error => {
      console.log(error);
      this.getArticle(this.selectedArticle!.id)
    });
  }

  deleteArticle(idArticle: number, index: number): void {
    this.articleService.deleteArticle(idArticle).subscribe(() => {
      if (this.selectedArticle?.id === idArticle) {
        this.selectedArticle = null;
      }
      this.listViewArticle.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  // getFiles(): void {
  //   const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
  //   this.articleService.getFileArticle(idBranch).subscribe(data => {
  //     data.result.forEach(viewFile => {
  //       this.listViewFile.push({
  //         id: viewFile.id,
  //         nameFile: viewFile.nameFile,
  //         typeFile: viewFile.typeFile,
  //         createdDate: viewFile.createdDate,
  //         destination: viewFile.destination
  //       });
  //     });
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  getFileTypesDestionation(): void {
    this.fileService.getTypesDestination().subscribe(data => {
      data.result.forEach(destination => this.listViewFolder.push({
        idTypeDestination: destination.idTypeDestination,
        nameDestination: destination.nameDestination,
        isOpen: false,
        files: []
      }));
      data.result.forEach(destination => this.listDestination.push({
        idTypeDestination: destination.idTypeDestination,
        nameDestination: destination.nameDestination,
        codeDestination: destination.codeDestination,
        description: destination.description
      }));
    })
  }

  getListfiles(idType: number, index: number): void {
    this.listViewFolder[index].files = [];
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.fileService.getFiles(idBranch, idType).subscribe(data => {
      console.log(data);
      data.result.forEach(file => this.listViewFolder[index].files.push({
          id: file.id,
          nameFile: file.nameFile,
          typeFile: file.typeFile,
          createdDate: file.createdDate,
          destination: {
            idTypeDestination: file.destination.idTypeDestination,
            nameDestination: file.destination.nameDestination,
            codeDestination: file.destination.codeDestination,
            description: file.destination.description
          }
        })
      );
      // this.listFiles = data.result;
      // console.log(this._listFiles)
    }, error => {
      console.log(error);
    });
  }

  uploadImage(event: Event, folder: ViewDestinationObject, index: number): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    const typeDestination = this.listDestination.filter(item => item.idTypeDestination === folder.idTypeDestination)[0];
    const body: SelectedFileObject = {
      file: file!,
      destination: typeDestination
    };
    this.fileService.uploadFile(body, idBranch).subscribe((event: any) => {
      if (event instanceof HttpResponse) {
        const result = event.body.result;
        this.listViewFolder[index].files.unshift({
          id: result.id,
          nameFile: result.nameFile,
          typeFile: result.typeFile,
          createdDate: result.createdDate,
          destination: {
            idTypeDestination: result.destination.idTypeDestination,
            nameDestination: result.destination.nameDestination,
            codeDestination: result.destination.codeDestination,
            description: result.destination.description
          }
        });
        this.setCoverArticle(result);
      }
    }, error => {
      console.log(error);
    });
    console.log("image")
  }

  changeStatusFolder(folder: ViewDestinationObject, index: number): void {
    folder.isOpen = !folder.isOpen;
    if (folder.isOpen) {
      this.getListfiles(folder.idTypeDestination, index);
    }
  }

  setTypeArticle(e: any): void {
    let type = this.listTypeAticle.filter(type => type.id === parseInt(e))[0];
    // this.listViewArticle[index].typeArticle = type;
    this.selectedArticle!.typeArticle = type;
  }


  clearFileArticle(): void {
    this.selectedArticle!.file = null;
  }

  setCoverArticle(file: FileObject): void {
    this.selectedArticle!.file = file;
  }

  previewImage(file: FileObject): string {
    const src = `/api/files/get/${file.id}`
    return src;
  }

  selectType(type: TypeArticleObject): void {
    this.selectedTypeArticle = type;
    this.selectedArticle = null;
    this.getListArticle();
  }

  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'alignment',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'fontColor',
        'highlight',
        'insertTable',
        // 'mediaEmbed',
        'undo',
        'redo',
        'todoList'
      ]
    },
    language: 'ru',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:alignLeft',
        'imageStyle:alignRight'
      ],
      styles: [
        'full',
        'alignLeft',
        'alignRight'
      ]


    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
  }
}
