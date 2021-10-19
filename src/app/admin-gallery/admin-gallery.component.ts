import {Component, OnInit} from '@angular/core';
import {VirtualExhibitionService} from "../service/virtual-exhibition.service";
import {ViewVirtualExhibitionObject, VirtualExhibitionObject} from "../../site-object/view-virtual-exhibition-object";
import {BookService} from "../service/book.service";
import {BookObject, ViewBookObject} from "../../site-object/book-object";
import {TypeComponentObject} from "../../site-object/typeComponent-object";
import {LibraryBranchObject} from "../../site-object/libraryBranch-object";
import {FileObject} from "../../site-object/file-object";

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {

  private _listCategoryVirtualExhibition: ViewVirtualExhibitionObject[] = [];
  private _listViewBook: ViewBookObject[] = [];
  private _virtualExhibition: VirtualExhibitionObject | null = null;
  private _selectedBook: BookObject | null = null;
  private _lang: string = "ru";
  private _close: boolean = false;

  get listCategoryVirtualExhibition(): ViewVirtualExhibitionObject[] {
    return this._listCategoryVirtualExhibition;
  }

  set listCategoryVirtualExhibition(value: ViewVirtualExhibitionObject[]) {
    this._listCategoryVirtualExhibition = value;
  }

  get listViewBook(): ViewBookObject[] {
    return this._listViewBook;
  }

  set listViewBook(value: ViewBookObject[]) {
    this._listViewBook = value;
  }

  get virtualExhibition(): VirtualExhibitionObject | null {
    return this._virtualExhibition;
  }

  set virtualExhibition(value: VirtualExhibitionObject | null) {
    this._virtualExhibition = value;
  }

  get selectedBook(): BookObject | null {
    return this._selectedBook;
  }

  set selectedBook(value: BookObject | null) {
    this._selectedBook = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  get close(): boolean {
    return this._close;
  }

  set close(value: boolean) {
    this._close = value;
  }

  constructor(private virtualExhibitionService: VirtualExhibitionService, private bookService: BookService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBooks();
  }

  log(): void {
    console.log(this.listCategoryVirtualExhibition);
    console.log(this.virtualExhibition?.books);
  }

  getCategories(): void {
    this.virtualExhibitionService.getCategories(parseInt(localStorage.getItem("BranchId")!!)).subscribe(data => {
      data.result.forEach(category => {
        this.listCategoryVirtualExhibition.push({
          id: category.id,
          nameRu: category.nameRu,
          nameEn: category.nameEn,
          nameKz: category.nameKz,
          showOnPage: category.showOnPage,
          isEdit: false,
          lastModifiedDate: category.lastModifiedDate,
          typeComponent: category.typeComponent,
          libraryBranch: category.libraryBranch
        });
      });
    }, error => {
      console.log(error);
    });
  }

  getCategory(index: number): void {
    const idCategory = this.listCategoryVirtualExhibition[index].id;
    this.virtualExhibitionService.getCategory(idCategory).subscribe(data => {
      this.listCategoryVirtualExhibition[index] = data.result;
    }, error => {
      console.log(error);
    });
  }

  getBooks(): void {
    this.bookService.getBooks(parseInt(localStorage.getItem("BranchId")!!)).subscribe(data => {
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

  getSelectedBook(idBook: number): void {
    this.close = true;
    this.selectedBook = null;
    this.bookService.getBook(idBook).subscribe(data => {
      this.selectedBook = data.result;
    }, error => {
      console.log(error);
    });
  }

  getBooksByCategory(idCategory: number): void {
    this.virtualExhibitionService.getBooksCategory(idCategory).subscribe(data => {
      console.log(data);
      const category = data.result;
      this.virtualExhibition = category;
      // if (category.books.length !== 0) {
      //   category.books.forEach((book: any) => {
      //     this.virtualExhibition!.books.push({
      //       id: book.id,
      //       authorRu: book.authorRu,
      //       authorEn: book.authorEn,
      //       authorKz: book.authorKz,
      //       nameBookRu: book.nameBookRu,
      //       nameBookEn: book.nameBookEn,
      //       nameBookKz: book.nameBookKz,
      //       isbn: book.isbn,
      //       descriptionRu: book.descriptionRu,
      //       descriptionEn: book.descriptionEn,
      //       descriptionKz: book.descriptionKz,
      //       lastModifiedDate: book.lastModifiedDate,
      //       typeComponent: book.typeComponent,
      //       libraryBranch: book.libraryBranch,
      //       file: book.file
      //     });
      //   });
      // }
    }, error => {
      console.log(error);
    });
  }

  addBookInCategory(idBook: number): void {
    if (this.virtualExhibition !== null) {
      this.virtualExhibitionService.addBookInCategory(this.virtualExhibition!.id, idBook).subscribe(data => {
        const book = data.result;
        this.virtualExhibition?.books.push({
          id: book.id,
          authorRu: book.authorRu,
          authorEn: book.authorEn,
          authorKz: book.authorKz,
          nameBookRu: book.nameBookRu,
          nameBookEn: book.nameBookEn,
          nameBookKz: book.nameBookKz,
          isbn: book.isbn,
          descriptionRu: book.descriptionRu,
          descriptionEn: book.descriptionEn,
          descriptionKz: book.descriptionKz,
          lastModifiedDate: book.lastModifiedDate,
          serialNumber: book,
          typeComponent: book.typeComponent,
          libraryBranch: book.libraryBranch,
          file: book.file
        });
      }, error => {
        console.log(error);
      });
    }
  }

  createCategory(): void {
    this.virtualExhibitionService.createCategory(parseInt(localStorage.getItem("BranchId")!!)).subscribe(data => {
      const category = data.result;
      this.listCategoryVirtualExhibition.unshift({
        id: category.id,
        nameRu: category.nameRu,
        nameEn: category.nameEn,
        nameKz: category.nameKz,
        showOnPage: category.showOnPage,
        isEdit: true,
        lastModifiedDate: category.lastModifiedDate,
        typeComponent: category.typeComponent,
        libraryBranch: category.libraryBranch
      });
    }, error => {
      console.log(error);
    });
  }

  updateCategory(index: number): void {
    const category = this.listCategoryVirtualExhibition[index];
    const body = {
      id: category.id,
      nameRu: category.nameRu,
      nameEn: category.nameEn,
      nameKz: category.nameKz,
      showOnPage: category.showOnPage
    };
    this.virtualExhibitionService.updateCategory(body).subscribe(data => {
      this.listCategoryVirtualExhibition[index] = data.result;
      this.listCategoryVirtualExhibition[index].isEdit = false;
    }, error => {
      this.getCategory(index);
      this.listCategoryVirtualExhibition[index].isEdit = false;
      console.log(error);
    });
  }

  blockButtonAddBook(idBook: number): boolean {
    let block = false;
    if (this.virtualExhibition && this.virtualExhibition.books.length) {
      for (let book of this.virtualExhibition.books) {
        if (book.id === idBook) {
          return true;
        }
      }
    }
    return block;
  }

  unhookBook(idBook: number, index: number): void {
    this.virtualExhibitionService.unhookBook(idBook).subscribe(data => {
      this.virtualExhibition?.books.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  moveBookRight(index: number): void {
    let listPosition = [];
    const book = this.virtualExhibition!.books[index];
    const nextBook = this.virtualExhibition!.books[index + 1];
    listPosition.push({
      id: book.id,
      serialNumber: nextBook.serialNumber
    }, {
      id: nextBook.id,
      serialNumber: book.serialNumber
    });
    this.virtualExhibitionService.changePosition(listPosition).subscribe(data => {
      this.virtualExhibition!.books[index] = nextBook;
      this.virtualExhibition!.books[index + 1] = book;
      const serialNumberBook = this.virtualExhibition!.books[index].serialNumber;
      const nextSerialNumberBook = this.virtualExhibition!.books[index + 1].serialNumber;
      this.virtualExhibition!.books[index].serialNumber = nextSerialNumberBook;
      this.virtualExhibition!.books[index + 1].serialNumber = serialNumberBook;
    }, error => {
      console.log(error);
    });
  }

  moveBookLeft(index: number): void {
    let listPosition = [];
    const book = this.virtualExhibition!.books[index];
    const previousBook = this.virtualExhibition!.books[index - 1];
    listPosition.push({
      id: book.id,
      serialNumber: previousBook.serialNumber
    }, {
      id: previousBook.id,
      serialNumber: book.serialNumber
    });
    this.virtualExhibitionService.changePosition(listPosition).subscribe(data => {
      this.virtualExhibition!.books[index] = previousBook;
      this.virtualExhibition!.books[index - 1] = book;
      const serialNumberBook = this.virtualExhibition!.books[index].serialNumber;
      const previousSerialNumberBook = this.virtualExhibition!.books[index - 1].serialNumber;
      this.virtualExhibition!.books[index].serialNumber = previousSerialNumberBook;
      this.virtualExhibition!.books[index - 1].serialNumber = serialNumberBook;
    }, error => {
      console.log(error);
    });
  }

  previewCover(idFile: number): string {
    return `/api/files/get/${idFile}`;
  }

  changeEditStatus(index: number): void {
    if (this.listCategoryVirtualExhibition[index].isEdit) {
      this.listCategoryVirtualExhibition[index].isEdit = false;
    } else {
      this.listCategoryVirtualExhibition[index].isEdit = true;
    }
  }

  deleteCategory(idCategory: number, index: number): void {
    this.virtualExhibitionService.deleteCategory(idCategory).subscribe(data => {
      this.listCategoryVirtualExhibition.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

}
