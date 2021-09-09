import {Component, EventEmitter, OnInit} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {MenuObject, TypeMenuObject} from "../../site-object/menu-object";
import {DataObject} from "../../site-object/data-object";

@Component({
  selector: 'app-admin-edit-menu',
  templateUrl: './admin-edit-menu.component.html',
  styleUrls: ['./admin-edit-menu.component.css']
})
export class AdminEditMenuComponent implements OnInit {

  private _listMainItemMenu: MenuObject[] = [];
  private _listNestedItemMenu: MenuObject[] = [];
  private _listTypeItemMenu: TypeMenuObject[] = [];
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

  get listTypeItemMenu(): TypeMenuObject[] {
    return this._listTypeItemMenu;
  }

  set listTypeItemMenu(value: TypeMenuObject[]) {
    this._listTypeItemMenu = value;
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
    this.menuService.updatedMenuPoints.subscribe(data => {
      this.updatedNestedItemMenu(data);
    })
    this.getTypeItemMenu();
  }

  private getMainitemsMenu(idBranch: number): void {
    this.listMainItemMenu = [];
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

  getMainItemMenu(): void {
    this.menuService.getMainitemMenu(this.mainItemMenu?.idItemMenuOnBranch!).subscribe(data => {
        const itemMenu = data.result[0];
        this.listMainItemMenu.forEach((value, index, array) => {
          if (value.idItemMenu === itemMenu.idItemMenu && value.idItemMenuOnBranch === itemMenu.idItemMenuOnBranch) {
            this.listMainItemMenu[index].showItem = itemMenu.showItem;
            this.listMainItemMenu[index].nameRu = itemMenu.nameRu;
            this.listMainItemMenu[index].nameKz = itemMenu.nameKz;
            this.listMainItemMenu[index].nameEn = itemMenu.nameEn;
            this.listMainItemMenu[index].typeItemMenu = itemMenu.typeItemMenu;
            this.listMainItemMenu[index].description = itemMenu.typeItemMenu;
            this.listMainItemMenu[index].indexNumber = itemMenu.indexNumber;
            this.listMainItemMenu[index].lastModifiedDate = itemMenu.indexNumber;
            this.listMainItemMenu[index].routeLink = itemMenu.routeLink;
          }
        });
      },
      error => {
        console.log(error)
      })
  }

  getTypeItemMenu(): void {
    this.menuService.getTypesItemMenu().subscribe(data => {
      data.result.forEach(type => this.listTypeItemMenu.push({
        id: type.id,
        nameType: type.nameType,
        codeType: type.codeType,
        description: type.description
      }))
    }, error => {
      console.log(error)
    });
  }

  updateVisibleItemMenu(): void {
    let listItemVisibleMenu = [];
    const itemMenu = {id: this.mainItemMenu?.idItemMenuOnBranch, visible: this.mainItemMenu?.showItem, mainPoint: true};
    listItemVisibleMenu.push(itemMenu);
    this.listNestedItemMenu.forEach(itemMenu => listItemVisibleMenu.push({
      id: itemMenu.idItemMenuOnBranch,
      visible: itemMenu.showItem,
      mainPoint: false
    }));
    this.getMainItemMenu();
    this.menuService.updateVisibleItemMenu(78, listItemVisibleMenu).subscribe(data => {
      this.menuService.updatedMenuPoints.emit(data);
    }, error => {
      this.getNestedItemsMenu(78);
      console.log(error);
    });
  }

  updatedNestedItemMenu(d: DataObject): void {
    for (let resultElement of d.result) {
      this.listNestedItemMenu.forEach((value, index, array) => {
        if (value.idItemMenu === resultElement.idItemMenu && value.idItemMenuOnBranch === resultElement.idItemMenuOnBranch) {
          array[index] = resultElement;
        }
      })
    }
  }

  log() {
    // console.log(this.edit);
    console.log(this.listNestedItemMenu);
    console.log(this.listTypeItemMenu);
    console.log(this.listTypeItemMenu[0]);
    console.log((this.listNestedItemMenu[0].typeItemMenu));
    console.log(this.listTypeItemMenu[0]  === this.listNestedItemMenu[0].typeItemMenu)
    // console.log(this.listMainItemMenu);
    // console.log(this.mainItemMenu);
    // console.log(this.listMainItemMenu.indexOf(this.listMainItemMenu[3]), "fdsfsdf");
    // console.log(this.updateVisibleItemMenu())
  }
}
