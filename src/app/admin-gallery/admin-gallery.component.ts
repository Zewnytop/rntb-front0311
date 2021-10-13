import {Component, OnInit} from '@angular/core';
import {VirtualExhibitionService} from "../service/virtual-exhibition.service";
import {ViewVirtualExhibitionObject, VirtualExhibitionObject} from "../../site-object/view-virtual-exhibition-object";
import {BookService} from "../service/book.service";
import {ViewBookObject} from "../../site-object/book-object";
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
    console.log(this.virtualExhibition);
  }

  getCategories(): void {
    this.virtualExhibitionService.getCategories(1).subscribe(data => {
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
    this.virtualExhibitionService.createCategory(1).subscribe(data => {
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
