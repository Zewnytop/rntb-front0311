import {Component, Input, OnInit} from '@angular/core';
import {SitePageService} from "../service/site-page.service";
import {SiteBook, SiteVirtualExhibitionObject} from "../../site-object/site-component-object";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  private _id: number | null = null;
  private _categoryVirtualExhibition: SiteVirtualExhibitionObject | null = null;
  private _bookVirtualExhibition: SiteBook | null = null;
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

  get bookVirtualExhibition(): SiteBook | null {
    return this._bookVirtualExhibition;
  }

  set bookVirtualExhibition(value: SiteBook | null) {
    this._bookVirtualExhibition = value;
  }

  get indexSelectedBook(): number | null {
    return this._indexSelectedBook;
  }

  set indexSelectedBook(value: number | null) {
    this._indexSelectedBook = value;
  }

  constructor(private sitePageService: SitePageService) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.sitePageService.getCategoriesVirtualExhibition(this.id!, "ru").subscribe(data => {
      this.categoryVirtualExhibition = data.result;
      console.log(this.categoryVirtualExhibition);
    }, error => {
      console.log(error);
    });
  }

  getBook(idBook: number, index: number): void {
    this.indexSelectedBook = index;
    this.close = true;
    this.sitePageService.getBook(idBook, "ru").subscribe(data => {
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
    divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft + 270;
  }

  previousPageBooks(): void {
    const divVirtualExhibition = document.getElementById("virtualExhibition" + this.id!.toString()) as HTMLElement;
    divVirtualExhibition!.scrollLeft = divVirtualExhibition!.scrollLeft - 270;
  }

  clearBookAndClose(): void {
    this.bookVirtualExhibition = null;
    this.close = false;
  }

  previewCover(idFile: number): string {
    return `/api/site/file/${idFile}`;
  }
}
