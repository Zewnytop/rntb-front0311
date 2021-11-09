import {Component, OnInit} from '@angular/core';
import {SiteLibraryBranchObject} from "../../site-object/site-component-object";
import {SitePageService} from "../service/site-page.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private _listLibraryBranch: SiteLibraryBranchObject[] = [];

  get listLibraryBranch(): SiteLibraryBranchObject[] {
    return this._listLibraryBranch;
  }

  set listLibraryBranch(value: SiteLibraryBranchObject[]) {
    this._listLibraryBranch = value;
  }

  constructor(private sitePageService: SitePageService, private router: Router) {
  }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(): void {
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
    // document.baseURI.split("/")[3]
    this.sitePageService.getLibraryBranches(null).subscribe(data => {
      data.result.forEach((branch: SiteLibraryBranchObject) => {
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
