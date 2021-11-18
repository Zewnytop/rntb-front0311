import {Component, Input, OnInit} from '@angular/core';
import {SitePageService} from "../service/site-page.service";
import {
  SiteBookObject,
  SiteVirtualExhibitionObject,
  ViewBookVirtualExhibitionObject
} from "../../site-object/site-component-object";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  private _id: number | null = null;
  private _isMainPage: boolean | null = null;
  private _categoryVirtualExhibition: SiteVirtualExhibitionObject | null = null;
  private _bookVirtualExhibition: SiteBookObject | null = null;
  private _indexSelectedBook: number | null = null;
  private _close: boolean = false;

  get close(): boolean {
    return this._close;
  }

  set close(value: boolean) {
    this._close = value;
  }

  get id(): number | null {
    return this._id;
  }

  @Input()
  set id(value: number | null) {
    this._id = value;
  }

  get isMainPage(): boolean | null {
    return this._isMainPage;
  }

  @Input()
  set isMainPage(value: boolean | null) {
    this._isMainPage = value;
  }

  get categoryVirtualExhibition(): SiteVirtualExhibitionObject | null {
    return this._categoryVirtualExhibition;
  }

  set categoryVirtualExhibition(value: SiteVirtualExhibitionObject | null) {
    this._categoryVirtualExhibition = value;
  }

  get bookVirtualExhibition(): SiteBookObject | null {
    return this._bookVirtualExhibition;
  }

  set bookVirtualExhibition(value: SiteBookObject | null) {
    this._bookVirtualExhibition = value;
  }

  get indexSelectedBook(): number | null {
    return this._indexSelectedBook;
  }

  set indexSelectedBook(value: number | null) {
    this._indexSelectedBook = value;
  }

  constructor(private sitePageService: SitePageService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getLastBook(): void {
    // const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    // const baseURI = urlWithSlash.replace('/', '');
    const domen = location.hostname;
    const lang = location.pathname.replace(/\//g, "");
    this.sitePageService.getLastBook(domen).subscribe(data => {
      const books: SiteVirtualExhibitionObject = {
        name: "",
        books: data.result
      };
      this.categoryVirtualExhibition = books;
    }, error => {
      console.log(error);
    })
  }

  getCategory(): void {
    // let paramsRoter: any[];
    // paramsRoter = this.router.url.trim().split("/");
    // if (paramsRoter.length >= 1) {
    //   if (paramsRoter[1].trim() === "ru") {
    //     paramsRoter[1] = 'ru';
    //   } else if (paramsRoter[1].trim() === "en") {
    //     paramsRoter[1] = 'en';
    //   } else if (paramsRoter[1].trim() === "kz") {
    //     paramsRoter[1] = 'kz';
    //   } else {
    //     paramsRoter[1] = 'ru';
    //   }
    // }
    if (this.isMainPage) {
      this.getLastBook();
    } else {
      const lang = location.pathname.replace(/\//g, "");
      this.sitePageService.getCategoriesVirtualExhibition(this.id!, lang).subscribe(data => {
        this.categoryVirtualExhibition = data.result;
        console.log(this.categoryVirtualExhibition);
      }, error => {
        console.log(error);
      });
    }
  }

  getBook(idBook: number, index: number): void {
    // let paramsRoter: any[];
    // paramsRoter = this.router.url.trim().split("/");
    // if (paramsRoter.length >= 1) {
    //   if (paramsRoter[1].trim() === "ru") {
    //     paramsRoter[1] = 'ru';
    //   } else if (paramsRoter[1].trim() === "en") {
    //     paramsRoter[1] = 'en';
    //   } else if (paramsRoter[1].trim() === "kz") {
    //     paramsRoter[1] = 'kz';
    //   } else {
    //     paramsRoter[1] = 'ru';
    //   }
    // }
    const lang = location.pathname.replace(/\//g, "");
    this.indexSelectedBook = index;
    this.close = true;
    this.sitePageService.getBook(idBook, lang).subscribe(data => {
      this.bookVirtualExhibition = data.result;
    }, error => {
      console.log(error);
    });
  }

  previewNextBook(): void {
    if (this.categoryVirtualExhibition?.books) {
      if (this.indexSelectedBook !== this.categoryVirtualExhibition.books.length - 1) {
        const nextBook = this.categoryVirtualExhibition.books[this.indexSelectedBook! + 1];
        this.getBook(nextBook.idBook, this.indexSelectedBook! + 1);
      }
    }
  }

  previewPreviousBook(): void {
    if (this.categoryVirtualExhibition?.books) {
      if (this.indexSelectedBook !== 0) {
        const previousBook = this.categoryVirtualExhibition.books[this.indexSelectedBook! - 1];
        this.getBook(previousBook.idBook, this.indexSelectedBook! - 1);
      }
    }
  }

  nextPageBooks(): void {
    if (!this.isMainPage) {
      const divVirtualExhibition = document.getElementById("virtualExhibition" + this.id!.toString()) as HTMLElement;
      divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft + 1111.7;
    } else {
      const divVirtualExhibition = document.getElementById("virtualExhibition") as HTMLElement;
      divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft + 1111.7;
    }
  }

  previousPageBooks(): void {
    if (!this.isMainPage) {
      const divVirtualExhibition = document.getElementById("virtualExhibition" + this.id!.toString()) as HTMLElement;
      divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft - 1111.7;
    } else {
      const divVirtualExhibition = document.getElementById("virtualExhibition") as HTMLElement;
      divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft - 1111.7;
    }
  }

  clearBookAndClose(): void {
    this.bookVirtualExhibition = null;
    this.close = false;
  }

  previewCover(idFile: number): string {
    return `/api/site/file/${idFile}`;
  }
}
