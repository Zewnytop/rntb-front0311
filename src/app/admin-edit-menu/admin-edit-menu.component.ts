import {Component, OnInit} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {MenuObject, TypeMenuObject} from "../../site-object/menu-object";

@Component({
  selector: 'app-admin-edit-menu',
  templateUrl: './admin-edit-menu.component.html',
  styleUrls: ['./admin-edit-menu.component.css']
})
export class AdminEditMenuComponent implements OnInit {

  private _listMainItemMenu: MenuObject[] = [];
  private _listNestedItemMenu: MenuObject[] = [];
  private _mainItemMenu: MenuObject | null = null;

  private _edit: boolean = false;

  get listMainItemMenu(): MenuObject[] {
    return this._listMainItemMenu;
  }

  set listMainItemMenu(value: MenuObject[]) {
    this._listMainItemMenu = value;
  }

  get listNestedItemMenu(): MenuObject[] {
    return this._listNestedItemMenu;
  }

  set listNestedItemMenu(value: MenuObject[]) {
    this._listNestedItemMenu = value;
  }

  get mainItemMenu(): MenuObject | null {
    return this._mainItemMenu;
  }

  set mainItemMenu(value: MenuObject | null) {
    this._mainItemMenu = value;
  }

  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.getMainitemsMenu(78);
  }

  private getMainitemsMenu(idBranch: number): void {
    this.menuService.getMainitemsMenu(idBranch).subscribe(data => {
      data.result.forEach(menu => this.listMainItemMenu.push({
        idItemMenuOnBranch: menu.idItemMenuOnBranch,
        idItemMenu: menu.idItemMenu,
        showItem: menu.showItem,
        indexNumber: menu.indexNumber,
        nameRu: menu.nameRu,
        nameEn: menu.nameEn,
        nameKz: menu.nameKz,
        routeLink: menu.routeLink,
        description: menu.description,
        lastModifiedDate: menu.lastModifiedDate,
        typeItemMenu: {
          id: menu.typeItemMenu.id,
          nameType: menu.typeItemMenu.nameType,
          codeType: menu.typeItemMenu.codeType,
          description: menu.typeItemMenu.description
        }
      }))
      this.mainItemMenu = this.listMainItemMenu[0];
      this.getNestedItemsMenu(78);
    }, error => {
      console.log(error)
    });
  }

  getNestedItemsMenu(idBranch: number): void {
    this.listNestedItemMenu = [];
    this.menuService.getNestedItemsMenu(idBranch, this.mainItemMenu!.idItemMenu).subscribe(data => {
        data.result.forEach(menu => this.listNestedItemMenu.push({
          idItemMenuOnBranch: menu.idItemMenuOnBranch,
          idItemMenu: menu.idItemMenu,
          showItem: menu.showItem,
          indexNumber: menu.indexNumber,
          nameRu: menu.nameRu,
          nameEn: menu.nameEn,
          nameKz: menu.nameKz,
          routeLink: menu.routeLink,
          description: menu.description,
          lastModifiedDate: menu.lastModifiedDate,
          typeItemMenu: {
            id: menu.typeItemMenu.id,
            nameType: menu.typeItemMenu.nameType,
            codeType: menu.typeItemMenu.codeType,
            description: menu.typeItemMenu.description
          }
        }))
      }, error => {
        console.log(error)
      }
    );
  }

  getMainItemMenuEdit(): MenuObject {
    const index = this.listMainItemMenu.indexOf(this.mainItemMenu!);
    return this.listMainItemMenu[index];
  }

  updateVisibleItemMenu(): any[] {
    let listItemVisibleMenu = [];
    const itemMenu = {id: this.mainItemMenu?.idItemMenuOnBranch, visible: this.mainItemMenu?.showItem};
    listItemVisibleMenu.push(itemMenu);
    this.listNestedItemMenu.forEach(itemMenu => listItemVisibleMenu.push({
      id: itemMenu.idItemMenuOnBranch,
      visible: itemMenu.showItem
    }))
    return listItemVisibleMenu;
    // this.menuService.updateVisibleItemMenu(78, listItemVisibleMenu)
  }

  log() {
    console.log(this.edit);
    console.log(this.listNestedItemMenu);
    console.log(this.listMainItemMenu);
    console.log(this.mainItemMenu);
    console.log(this.listMainItemMenu.indexOf(this.mainItemMenu!));

    console.log(this.updateVisibleItemMenu())
  }
}
