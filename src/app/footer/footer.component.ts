import {Component, OnInit} from '@angular/core';
import {MenuObject} from "../../site-object/menu-object";
import {HttpClient} from "@angular/common/http";
import {SitePageService} from "../service/site-page.service";
import {SiteMenuObject} from "../../site-object/site-component-object";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _listItemMenu: any[] = [];

  get listItemMenu(): any[] {
    return this._listItemMenu;
  }

  set listItemMenu(value: any[]) {
    this._listItemMenu = value;
  }

  constructor(private sitePageService: SitePageService) {
  }

  ngOnInit(): void {
    this.getItemMenu();
  }

  getItemMenu(): void {
    const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    const baseURI = urlWithSlash.replace('/', '');
    this.sitePageService.getSiteMenu(baseURI, document.baseURI.split("/")[3]).subscribe(data => {
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
