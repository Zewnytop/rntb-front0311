import {Component, OnInit} from '@angular/core';
import {SitePageService} from "../service/site-page.service";
import {SitePageComponentObject, SitePageObject} from "../../site-object/site-component-object";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private _news: SitePageComponentObject[] = [];

  get news(): SitePageComponentObject[] {
    return this._news;
  }

  set news(value: SitePageComponentObject[]) {
    this._news = value;
  }

  constructor(private sitePageService: SitePageService) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    const baseURI = urlWithSlash.replace('/', '');
    this.sitePageService.getNew(baseURI).subscribe(data => {
      console.log(data);
      data.result.forEach(item => {
        this.news.push({
          idComponent: item.idComponent,
          codeType: item.codeType
        });
      });
    }, error => {
      console.log(error);
    });
  }

}
