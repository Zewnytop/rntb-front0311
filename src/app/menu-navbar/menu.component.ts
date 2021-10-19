import {Component, OnInit} from '@angular/core';
import {MenuObject} from "../../site-object/menu-object";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _listMainItemMenu: MenuObject[] = [];

  get listMainItemMenu(): MenuObject[] {
    return this._listMainItemMenu;
  }

  set listMainItemMenu(value: MenuObject[]) {
    this._listMainItemMenu = value;
  }

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getMainitemsMenu();
  }

  getMainitemsMenu(): void {
    const urlWithSlash = document.baseURI.replace(/.*\/\//, '');
    const baseURI = urlWithSlash.replace('/', '');
    const url = `/api/page/menu/${baseURI}`;
    this.httpClient.get<any>(url).subscribe(data => {
      console.log(data);
      this.listMainItemMenu = this.setListItemMenu(data.result);
      console.log("dasdasdas");
      console.log(this.listMainItemMenu);
    }, error => {
      console.log(error);
    });
  }

  setListItemMenu(itemsMenu: MenuObject[]): any[] {
    let listItemMenu: any[] = [];
    itemsMenu.forEach((item) => {
      let itemMenu: { [k: string]: any } = {
        id: item.id,
        showItem: item.showItem,
        serialNumber: item.serialNumber,
        nameRu: item.nameRu,
        nameEn: item.nameEn,
        nameKz: item.nameKz,
        description: item.description,
        lastModifiedDate: item.lastModifiedDate,
        isEdit: false,
        parentItem: item.parentItem,
        file: item.file,
        typeComponent: item.typeComponent,
        libraryBranch: item.libraryBranch,
        // childerItemMenu: MenuObject[],
        typeItemMenu: item.typeItemMenu
      };
      if (item.childerItemMenu) {
        itemMenu['childerItemMenu'] = this.setListItemMenu(item.childerItemMenu);
      }
      listItemMenu.push(itemMenu);
    }, this);
    return listItemMenu;
  }

}
