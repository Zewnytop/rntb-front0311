import {Component, OnInit} from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @ts-ignore
import * as CustomEditor from '../../ckeditor5custom/build/ckeditor';
import {ArticleService} from "../service/article.service";
import {ArticleObject, TypeArticleObject, ViewArticleObject} from "../../site-object/article-object";
import {TypeComponentObject} from "../../site-object/typeComponent-object";
import {LibraryBranchObject} from "../../site-object/libraryBranch-object";
import {FileObject} from "../../site-object/file-object";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  public Editor = CustomEditor;
  public tst = '';
  public tst1 = '';
  private _listViewArticle: ViewArticleObject[] = [];
  private _listTypeAticle: TypeArticleObject[] = [];
  private _listViewFile: FileObject[] = [];
  private _selectedTypeArticle: TypeArticleObject | null = null;
  private _selectedArticle: ArticleObject | null = null;
  private _lang: string = "ru";

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

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.getListTypeAticle();
    this.getFiles();
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
    this.listViewArticle = [];
    this.articleService.getListArticle(19, this.selectedTypeArticle!.id).subscribe(data => {
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
    this.articleService.createArticle(19, this.selectedTypeArticle!.id).subscribe(data => {
      const newArticle = data.result;
      this.listViewArticle.push({
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
      fileId: this.selectedArticle?.file?.id
    };
    this.articleService.updateArticle(body).subscribe(data => {
      const itemViewArticle = this.listViewArticle.filter(item => item.id === this.selectedArticle?.id)[0];
      itemViewArticle.name = data.result.name;
      itemViewArticle.lastModifiedDate = data.result.lastModifiedDate;
      itemViewArticle.showOnPage = data.result.showOnPage;
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

  getFiles(): void {
    this.articleService.getFileArticle(19).subscribe(data => {
      data.result.forEach(viewFile => {
        this.listViewFile.push({
          id: viewFile.id,
          nameFile: viewFile.nameFile,
          typeFile: viewFile.typeFile,
          createdDate: viewFile.createdDate,
          destination: viewFile.destination
        });
      });
    }, error => {
      console.log(error);
    });
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
  public configTwo = {
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
        'blockQuote',
        'fontColor',
        'highlight',
        'undo',
        'redo'
      ]
    },
    language: {
      ui: 'ru',
      content: 'ru'
    },
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
    }
  }
}
