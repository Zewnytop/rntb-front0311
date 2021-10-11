import {Component, OnInit} from '@angular/core';
import {BookService} from "../service/book.service";
import {BookObject, ViewBookObject} from "../../site-object/book-object";

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit {

  private _listViewBook: ViewBookObject[] = []
  private _book: BookObject | null = null;
  private _lang: string = "ru";

  get listViewBook(): ViewBookObject[] {
    return this._listViewBook;
  }

  set listViewBook(value: ViewBookObject[]) {
    this._listViewBook = value;
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
  }

  getBooks(): void {
    this.bookService.getBooks(1).subscribe(data => {
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

  createBook(): void {
    this.bookService.createBook(1).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  deleteBook(idBook: number, index: number): void {
    this.bookService.deleteBook(idBook).subscribe(data => {
      this.listViewBook.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  log(): void {
    console.log(this.listViewBook);
    console.log(this.book);
  }
}
