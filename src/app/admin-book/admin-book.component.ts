import {Component, OnInit} from '@angular/core';
import {BookService} from "../service/book.service";
import {BookObject, ViewBookObject} from "../../site-object/book-object";
import {DestinationObject, FileObject} from "../../site-object/file-object";
// @ts-ignore
import * as CustomEditor from '../../ckeditor5custom/build/ckeditor';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit {

  private _listViewBook: ViewBookObject[] = [];
  private _listViewFile: FileObject[] = [];
  private _book: BookObject | null = null;
  private _lang: string = "ru";
  private _close: boolean = false;
  private _edit: boolean = false;
  public Editor = CustomEditor;


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

  get listViewBook(): ViewBookObject[] {
    return this._listViewBook;
  }

  set listViewBook(value: ViewBookObject[]) {
    this._listViewBook = value;
  }

  get listViewFile(): FileObject[] {
    return this._listViewFile;
  }

  set listViewFile(value: FileObject[]) {
    this._listViewFile = value;
  }

  get book(): BookObject | null {
    return this._book;
  }

  set book(value: BookObject | null) {
    this._book = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.getFiles();
  }

  getBooks(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.bookService.getBooks(idBranch).subscribe(data => {
      data.result.forEach(viewBook => {
        this.listViewBook.push({
          id: viewBook.id,
          name: viewBook.name,
          lastModifiedDate: viewBook.lastModifiedDate
        })
      });
    }, error => {
      console.log(error);
    });
  }

  getBook(idBook: number): void {
    this.bookService.getBook(idBook).subscribe(data => {
      this.book = data.result;
    }, error => {
      console.log(error);
    });
  }

  getFiles(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.bookService.getFiles(idBranch).subscribe(data => {
      data.result.forEach(viewFile => {
        this.listViewFile.push({
          id: viewFile.id,
          nameFile: viewFile.nameFile,
          typeFile: viewFile.typeFile,
          createdDate: viewFile.createdDate,
          destination: viewFile.destination
        });
      });
      console.log(data.result)
    }, error => {
      console.log(error);
    });
  }

  createBook(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.bookService.createBook(idBranch).subscribe(data => {
      const book = data.result;
      this.listViewBook.unshift({
        id: book.id,
        name: book.nameBookRu,
        lastModifiedDate: book.lastModifiedDate
      });
      this.book = book;
    }, error => {
      console.log(error);
    });
  }

  updateBook(): void {
    const body = {
      id: this.book!.id,
      authorRu: this.book?.authorRu,
      authorEn: this.book?.authorEn,
      authorKz: this.book?.authorKz,
      nameRu: this.book?.nameBookRu,
      nameEn: this.book?.nameBookEn,
      nameKz: this.book?.nameBookKz,
      descriptionRu: this.book?.descriptionRu,
      descriptionEn: this.book?.descriptionEn,
      descriptionKz: this.book?.descriptionKz,
      isbn: this.book?.isbn,
      fileId: this.book?.file?.id
    };
    this.bookService.updateBook(body).subscribe(() => {
      this.listViewBook.filter(viewBok => viewBok.id === this.book?.id)[0].name = this.book!.nameBookRu;
    }, error => {
      this.getBook(this.book!.id);
      console.log(error);
    });
  }

  setCoverBook(file: FileObject): void {
    this.book!.file = file;
  }

  previewImage(file: FileObject): string {
    const src = `/api/files/get/${file.id}`
    return src;
  }

  deleteBook(idBook: number, index: number): void {
    this.bookService.deleteBook(idBook).subscribe(data => {
      if (this.listViewBook[index].id === this.book?.id) {
        this.book = null;
      }
      this.listViewBook.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  public config = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'underline',
      ]
    },
    language: 'ru',
  }

}
