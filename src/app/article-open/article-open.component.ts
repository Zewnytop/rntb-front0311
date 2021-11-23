import {Component, Input, OnInit} from '@angular/core';
import {SiteArticleObject} from "../../site-object/site-component-object";
import {ActivatedRoute} from "@angular/router";
import {SitePageService} from "../service/site-page.service";

@Component({
  selector: 'app-article-open',
  templateUrl: './article-open.component.html',
  styleUrls: ['./article-open.component.css']
})
export class ArticleOpenComponent implements OnInit {

  private _id: number | null = null;
  private _idPage: number | null = null;
  private _article: SiteArticleObject | null = null;
  private _namePage: string = "";

  get id(): number | null {
    return this._id;
  }

  set id(value: number | null) {
    this._id = value;
  }

  get idPage(): number | null {
    return this._idPage;
  }

  set idPage(value: number | null) {
    this._idPage = value;
  }

  get article(): SiteArticleObject | null {
    return this._article;
  }

  set article(value: SiteArticleObject | null) {
    this._article = value;
  }


  get namePage(): string {
    return this._namePage;
  }

  set namePage(value: string) {
    this._namePage = value;
  }

  constructor(private sitePageService: SitePageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id2'];
      this.getArticle();
    });
    this.activatedRoute.params.subscribe(params => {
      this.idPage = params['id1'];
      this.getNamePage();
    });
  }

  getArticle(): void {
    const lang = location.pathname.replace(/\//g, "");
    this.sitePageService.getArticle(this.id!, lang).subscribe(data => {
      console.log("data");
      console.log(data);
      this.article = data.result;
    }, error => {
      console.log(error);
    });
  }

  getNamePage(): void {
    const lang = location.pathname.replace(/\//g, "");
    this.sitePageService.getNamePageForArticle(this.idPage!, lang).subscribe(data => {
      console.log("data");
      console.log(data);
      this.namePage = data.result;
    }, error => {
      console.log(error);
    });
  }

  previewCover(idFile: number): string {
    return `/api/site/file/${idFile}`;
  }

}
