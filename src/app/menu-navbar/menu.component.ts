import {Component, OnInit} from '@angular/core';
import {MenuObject} from "../../site-object/menu-object";
import {HttpClient} from "@angular/common/http";
import {SiteLocalizationObject, SiteMenuObject, SiteParameter} from "../../site-object/site-component-object";
import {SitePageService} from "../service/site-page.service";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _listSiteItemMenu: SiteMenuObject[] = [];
  private _listLanguage: SiteLocalizationObject[] = [];
  private _listParameter: SiteParameter[] = [];
  private _branchName: string = "";
  private _urlTelegram: string = "";
  private _urlInstagram: string = "";
  private _urlFacebook: string = "";
  private pathArray: any;

  get listSiteItemMenu(): SiteMenuObject[] {
    return this._listSiteItemMenu;
  }

  set listSiteItemMenu(value: SiteMenuObject[]) {
    this._listSiteItemMenu = value;
  }

  get listLanguage(): SiteLocalizationObject[] {
    return this._listLanguage;
  }

  set listLanguage(value: SiteLocalizationObject[]) {
    this._listLanguage = value;
  }

  get listParameter(): SiteParameter[] {
    return this._listParameter;
  }

  set listParameter(value: SiteParameter[]) {
    this._listParameter = value;
  }

  get branchName(): string {
    return this._branchName;
  }

  set branchName(value: string) {
    this._branchName = value;
  }

  get urlTelegram(): string {
    return this._urlTelegram;
  }

  set urlTelegram(value: string) {
    this._urlTelegram = value;
  }

  get urlInstagram(): string {
    return this._urlInstagram;
  }

  set urlInstagram(value: string) {
    this._urlInstagram = value;
  }

  get urlFacebook(): string {
    return this._urlFacebook;
  }

  set urlFacebook(value: string) {
    this._urlFacebook = value;
  }

  constructor(private sitePageService: SitePageService, private router: Router) {
  }


  ngOnInit(): void {
    this.getLanguage();
    this.getNameBranch();
    this.getParameters();
    this.getItemMenu();
  }

  changeLanguage(lang: string): void {
    let paramsRoter: any[];
    paramsRoter = this.router.url.trim().split("/");
    paramsRoter[1] = lang;
    let newNavigateUrl = "";
    paramsRoter.forEach((param: any) => {
      if (param !== "") {
        newNavigateUrl += "/" + param;
      }
    });
    this.router.navigate([newNavigateUrl]);
  }

  navigateHome(): void {
    let paramsRoter: any[];
    paramsRoter = this.router.url.trim().split("/");
    const newNavigateUrl = "/" + paramsRoter[1];
    this.router.navigate([newNavigateUrl]);
  }

  getParameters(): void {
    this.sitePageService.getParameters().subscribe(data => {
      data.result.forEach(item => {
        this.listParameter.push({
          code: item.code,
          value: item.value
        });
      });
      for (let siteParameter of this.listParameter) {
        if (siteParameter.code === 'Telegram') {
          this.urlTelegram = siteParameter.value;
        } else if (siteParameter.code === 'Facebook') {
          this.urlFacebook = siteParameter.value;
        } else if (siteParameter.code === 'Instagram') {
          this.urlInstagram = siteParameter.value;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getNameBranch(): void {
    // let paramsRoter: any[];
    // paramsRoter = this.router.url.trim().split("/");
    // const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    // const baseURI = urlWithSlash.replace('/', '');
    // document.baseURI.split("/")[3]
    const domen = document.baseURI.split("/")[2];
    const lang = document.baseURI.split("/")[3];
    this.sitePageService.getNameBranch(domen, lang).subscribe(data => {
      this.branchName = data.result;
    }, error => {
      console.log(error);
    });
  }

  getItemMenu(): void {
    // let paramsRoter: any[];
    // paramsRoter = this.router.url.trim().split("/");
    // const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    // const baseURI = urlWithSlash.replace('/', '');
    const domen = document.baseURI.split("/")[2];
    const lang = document.baseURI.split("/")[3];
    this.sitePageService.getSiteMenu(domen, lang).subscribe(data => {
      this.listSiteItemMenu = this.getListItemMenu(data.result);
    }, error => {
      console.log(error);
    });
  }

  getListItemMenu(listItem: SiteMenuObject[]): any[] {
    let listItemMenu: any[] = [];
    if (listItem && listItem.length) {
      listItem.forEach((item) => {
        let itemMenu: { [k: string]: any } = {
          name: item.name,
          pageId: item.pageId,
          fileId: item.fileId,
          codeTypeItemMenu: item.codeTypeItemMenu,
          childrenItem: []
        };
        if (item.childrenItem && item.childrenItem.length) {
          itemMenu['childrenItem'] = this.getListItemMenu(item.childrenItem);
        }
        listItemMenu.push(itemMenu);
      }, this);
    }
    return listItemMenu;
  }


  getLanguage(): void {
    this.sitePageService.getLanguages().subscribe(data => {
      data.result.forEach(item => {
        this.listLanguage.push({
          name: item.name,
          code: item.code
        });
      });
    }, error => {
      console.log(error);
    });
  }

  setScrollTop() {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 960;
    }
  }

  // setListItemMenu(itemsMenu: MenuObject[]): any[] {
  //   let listItemMenu: any[] = [];
  //   itemsMenu.forEach((item) => {
  //     let itemMenu: { [k: string]: any } = {
  //       id: item.id,
  //       showItem: item.showItem,
  //       serialNumber: item.serialNumber,
  //       nameRu: item.nameRu,
  //       nameEn: item.nameEn,
  //       nameKz: item.nameKz,
  //       description: item.description,
  //       lastModifiedDate: item.lastModifiedDate,
  //       isEdit: false,
  //       parentItem: item.parentItem,
  //       file: item.file,
  //       typeComponent: item.typeComponent,
  //       libraryBranch: item.libraryBranch,
  //       // childerItemMenu: MenuObject[],
  //       typeItemMenu: item.typeItemMenu,
  //       page: item.page
  //     };
  //     if (item.childerItemMenu) {
  //       itemMenu['childerItemMenu'] = this.setListItemMenu(item.childerItemMenu);
  //     }
  //     listItemMenu.push(itemMenu);
  //   }, this);
  //   return listItemMenu;
  // }

}
