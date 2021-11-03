import {Component, Input, OnInit} from '@angular/core';
import {SitePageService} from "../service/site-page.service";
import {SiteBookObject, SiteVirtualExhibitionObject} from "../../site-object/site-component-object";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  private _id: number | null = null;
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

  getCategory(): void {
    let paramsRoter: any[];
    paramsRoter = this.router.url.trim().split("/");
    this.sitePageService.getCategoriesVirtualExhibition(this.id!, paramsRoter[1]).subscribe(data => {
      this.categoryVirtualExhibition = data.result;
      console.log(this.categoryVirtualExhibition);
    }, error => {
      console.log(error);
    });
  }

  getBook(idBook: number, index: number): void {
    let paramsRoter: any[];
    paramsRoter = this.router.url.trim().split("/");
    this.indexSelectedBook = index;
    this.close = true;
    this.sitePageService.getBook(idBook, paramsRoter[1]).subscribe(data => {
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
    const divVirtualExhibition = document.getElementById("virtualExhibition" + this.id!.toString()) as HTMLElement;
    divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft + 1111.7;
  }

  previousPageBooks(): void {
    const divVirtualExhibition = document.getElementById("virtualExhibition" + this.id!.toString()) as HTMLElement;
    divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft - 1111.7;
  }

  clearBookAndClose(): void {
    this.bookVirtualExhibition = null;
    this.close = false;
  }

  previewCover(idFile: number): string {
    return `/api/site/file/${idFile}`;
  }
}
