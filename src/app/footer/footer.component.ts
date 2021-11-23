import {Component, OnInit} from '@angular/core';
import {MenuObject} from "../../site-object/menu-object";
import {HttpClient} from "@angular/common/http";
import {SitePageService} from "../service/site-page.service";
import {SiteMainContact, SiteMenuObject, SiteParameter} from "../../site-object/site-component-object";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _listItemMenu: any[] = [];
  private _listParameter: SiteParameter[] = [];
  private _mainContact: SiteMainContact | null = null;
  private _timeWork: string = "";

  get listItemMenu(): any[] {
    return this._listItemMenu;
  }

  set listItemMenu(value: any[]) {
    this._listItemMenu = value;
  }

  get listParameter(): SiteParameter[] {
    return this._listParameter;
  }

  set listParameter(value: SiteParameter[]) {
    this._listParameter = value;
  }

  get mainContact(): SiteMainContact | null {
    return this._mainContact;
  }

  set mainContact(value: SiteMainContact | null) {
    this._mainContact = value;
  }

  get timeWork(): string {
    return this._timeWork;
  }

  set timeWork(value: string) {
    this._timeWork = value;
  }

  constructor(private sitePageService: SitePageService) {
  }

  ngOnInit(): void {
    this.getParameters();
    this.getItemMenu();
    this.geMainContact();
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
        if (siteParameter.code === 'TimeWork') {
          this.timeWork = siteParameter.value;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  geMainContact(): void {
    // const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    // const baseURI = urlWithSlash.replace('/', '');
    // const domen = document.baseURI.split("/")[2];
    // const lang = document.baseURI.split("/")[3];
    const domen = location.hostname;
    const lang = location.pathname.replace(/\//g, "");
    this.sitePageService.getMainComponent(domen, lang).subscribe(data => {
      this.mainContact = data.result;
    }, error => {
      console.log(error);
    });
  }

  getItemMenu(): void {
    // const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    // const baseURI = urlWithSlash.replace('/', '');
    // document.baseURI.split("/")[3]
    // const domen = document.baseURI.split("/")[2];
    // const lang = document.baseURI.split("/")[3];
    const domen = location.hostname;
    const lang = location.pathname.replace(/\//g, "");
    this.sitePageService.getSiteMenu(domen, lang).subscribe(data => {
      this.listItemMenu = this.getListItemMenu(data.result);
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
          linkResource: item.linkResource,
          isShow: false,
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

  navigateHome(): string {
    // let paramsRoter: any[];
    // paramsRoter = this.router.url.trim().split("/");
    const lang = location.pathname.replace(/\//g, "");
    let newNavigateUrl = location.origin + "/" + lang + "/#/";
    return newNavigateUrl;
    // this.router.navigate([newNavigateUrl]);
  }

  viewFile(idFile: number): string {
    return "/api/site/file/" + idFile;
  }

  // setListItemMenu(itemsMenu: [any]): any[] {
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
  //       isOpen: false,
  //       parentItem: item.parentItem,
  //       file: item.file,
  //       typeComponent: item.typeComponent,
  //       libraryBranch: item.libraryBranch,
  //       // childerItemMenu: MenuObject[],
  //       typeItemMenu: item.typeItemMenu
  //     };
  //     if (item.childerItemMenu) {
  //       itemMenu['childerItemMenu'] = this.setListItemMenu(item.childerItemMenu);
  //     }
  //     listItemMenu.push(itemMenu);
  //   }, this);
  //   return listItemMenu;
  // }

  changeStatus(item: any): void {
    if (item.isShow) {
      item.isShow = false;
    } else {
      item.isShow = true;
    }
  }

  setScrollTop() {
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 960;
    }
  }
}
