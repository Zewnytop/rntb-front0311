import {Component, Input, OnInit} from '@angular/core';
import {SiteArticleObject} from "../../site-object/site-component-object";
import {SitePageService} from "../service/site-page.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private _id: number | null = null;
  private _article: SiteArticleObject | null = null;

  get id(): number | null {
    return this._id;
  }

  @Input()
  set id(value: number | null) {
    this._id = value;
  }

  get article(): SiteArticleObject | null {
    return this._article;
  }

  set article(value: SiteArticleObject | null) {
    this._article = value;
  }

  constructor(private sitePageService: SitePageService, private router: Router) {
  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
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
    // const domen = document.baseURI.split("/")[2];
    // const lang = document.baseURI.split("/")[3];
    // const domen = location.hostname;
    const lang = location.pathname.replace(/\//g, "");
    this.sitePageService.getArticle(this.id!, lang).subscribe(data => {
      console.log("data");
      console.log(data);
      this.article = data.result;
    }, error => {
      console.log(error);
    });
  }

  previewCover(idFile: number): string {
    return `/api/site/file/${idFile}`;
  }

}
