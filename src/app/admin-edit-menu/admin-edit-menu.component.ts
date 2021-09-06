import {Component, OnInit} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {MenuObject, TypeMenuObject} from "../../site-object/menu-object";

@Component({
  selector: 'app-admin-edit-menu',
  templateUrl: './admin-edit-menu.component.html',
  styleUrls: ['./admin-edit-menu.component.css']
})
export class AdminEditMenuComponent implements OnInit {

  private _listMainItemMenu: MenuObject[] = []
  private _listNestedItemMenu: MenuObject[] = []
  private _idMainItemMenu: number | null = null

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

  get idMainItemMenu(): number | null {
    return this._idMainItemMenu;
  }

  set idMainItemMenu(value: number | null) {
    this._idMainItemMenu = value;
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
    }, error => {
      console.log(error)
    });
  }

  getNestedItemsMenu(idBranch: number): void {
    this.listNestedItemMenu = [];
    this.menuService.getNestedItemsMenu(idBranch, this.idMainItemMenu!).subscribe(data => {
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

}
