import {Component, OnInit} from '@angular/core';
import {SitePageService} from "../service/site-page.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SitePageObject} from "../../site-object/site-component-object";

@Component({
  selector: 'app-site-page',
  templateUrl: './site-page.component.html',
  styleUrls: ['./site-page.component.css']
})
export class SitePageComponent implements OnInit {

  private id: number | null = null;
  private _page: SitePageObject | null = null;

  get page(): SitePageObject | null {
    return this._page;
  }

  set page(value: SitePageObject | null) {
    this._page = value;
  }

  constructor(private sitePageService: SitePageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getPage();
    });
  }

  getPage(): void {
    this.sitePageService.getPage(this.id!).subscribe(data => {
      this.page = data.result;
      console.log(this._page);
    }, error => {
      console.log(error);
    });
  }

}
