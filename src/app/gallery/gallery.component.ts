import {Component, Input, OnInit} from '@angular/core';
import {SitePageService} from "../service/site-page.service";
import {VirtualExhibitionObject} from "../../site-object/site-component-object";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  private _id: number | null = null;
  private _categoryVirtualExhibition: VirtualExhibitionObject | null = null;

  get id(): number | null {
    return this._id;
  }

  @Input()
  set id(value: number | null) {
    this._id = value;
  }

  get categoryVirtualExhibition(): VirtualExhibitionObject | null {
    return this._categoryVirtualExhibition;
  }

  set categoryVirtualExhibition(value: VirtualExhibitionObject | null) {
    this._categoryVirtualExhibition = value;
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

  previewCover(idFile: number): string {
    return `/api/files/get/${idFile}`;
  }
}
