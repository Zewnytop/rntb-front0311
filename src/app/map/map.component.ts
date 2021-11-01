import {Component, OnInit} from '@angular/core';
import {SiteLibraryBranch} from "../../site-object/site-component-object";
import {SitePageService} from "../service/site-page.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private _listLibraryBranch: SiteLibraryBranch[] = [];

  get listLibraryBranch(): SiteLibraryBranch[] {
    return this._listLibraryBranch;
  }

  set listLibraryBranch(value: SiteLibraryBranch[]) {
    this._listLibraryBranch = value;
  }

  constructor(private sitePageService: SitePageService, private router: Router) {
  }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(): void {
    let paramsRoter: any[];
    paramsRoter = this.router.url.trim().split("/");
    this.sitePageService.getLibraryBranches(paramsRoter[1]).subscribe(data => {
      data.result.forEach((branch: SiteLibraryBranch) => {
        this.listLibraryBranch.push({
          name: branch.name,
          city: branch.city,
          domen: branch.domen
        });
      });
    }, error => {
      console.log(error);
    });
  }

}
