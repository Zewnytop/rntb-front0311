import {Component, EventEmitter, OnInit} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {MenuObject, TypeMenuItemObject} from "../../site-object/menu-object";
import {DataObject} from "../../site-object/data-object";
import {FileObject} from "../../site-object/file-object";
import {TypeComponentObject} from "../../site-object/typeComponent-object";
import {LibraryBranchObject} from "../../site-object/libraryBranch-object";

@Component({
  selector: 'app-admin-edit-menu',
  templateUrl: './admin-edit-menu.component.html',
  styleUrls: ['./admin-edit-menu.component.css']
})
export class AdminEditMenuComponent implements OnInit {

  private _listMainItemMenu: MenuObject[] = [];
  private _listNestedItemMenu: MenuObject[] = [];
  private _listTypeItemMenu: TypeMenuItemObject[] = [];
  private _mainItemMenu: MenuObject | null = null;
  private _lang: string = "ru";

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

  get listTypeItemMenu(): TypeMenuItemObject[] {
    return this._listTypeItemMenu;
  }

  set listTypeItemMenu(value: TypeMenuItemObject[]) {
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

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.getMainitemsMenu(1);
    this.menuService.updatedMenuPoints.subscribe(data => {
      this.updatedNestedItemMenu(data);
    })
    this.getTypeItemMenu();
  }

  createItemMenu(idParent: number | null = null, index: number | null = null): void {
    if (index === null) {
      let serialNumber = this.listMainItemMenu.length;
      if (this.listMainItemMenu.length === 0) {
        serialNumber = 0;
      }
      this.menuService.createItemMenu(1, serialNumber, idParent).subscribe(data => {
        console.log(data)
        const itemMenu = data.result;
        this.listMainItemMenu.push({
          id: itemMenu.id,
          showItem: itemMenu.showItem,
          serialNumber: itemMenu.serialNumber,
          nameRu: itemMenu.nameRu,
          nameEn: itemMenu.nameEn,
          nameKz: itemMenu.nameKz,
          description: itemMenu.description,
          lastModifiedDate: itemMenu.lastModifiedDate,
          isEdit: false,
          parentItem: itemMenu.parentItem,
          file: itemMenu.file,
          typeComponent: itemMenu.typeComponent,
          libraryBranch: itemMenu.libraryBranch,
          childerItemMenu: [],
          typeItemMenu: itemMenu.typeItemMenu
        })
      }, error => {
        console.log(error)
      });
    } else {
      let serialNumber = this.listMainItemMenu[index].childerItemMenu.length;
      if (this.listMainItemMenu[index].childerItemMenu.length === 0) {
        serialNumber = 0;
      }
      console.log("lengts")
      console.log(serialNumber)
      this.menuService.createItemMenu(1, serialNumber, idParent).subscribe(data => {
        console.log(data)
        const itemMenu = data.result;
        this.listMainItemMenu[index].childerItemMenu.push({
          id: itemMenu.id,
          showItem: itemMenu.showItem,
          serialNumber: itemMenu.serialNumber,
          nameRu: itemMenu.nameRu,
          nameEn: itemMenu.nameEn,
          nameKz: itemMenu.nameKz,
          description: itemMenu.description,
          lastModifiedDate: itemMenu.lastModifiedDate,
          isEdit: false,
          parentItem: itemMenu.parentItem,
          file: itemMenu.file,
          typeComponent: itemMenu.typeComponent,
          libraryBranch: itemMenu.libraryBranch,
          childerItemMenu: [],
          typeItemMenu: itemMenu.typeItemMenu
        })
      }, error => {
        console.log(error)
      });
    }
  }

  getMainitemsMenu(idBranch: number): void {
    this.menuService.getMainitemsMenu(idBranch).subscribe(data => {
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

  changeEditStatus(item: MenuObject): void {
    if (item.isEdit) {
      item.isEdit = false;
    } else {
      item.isEdit = true;
    }
  }

  deleteItemMenu(id: number, index: number, childIndex: number | null = null): void {
    if (childIndex === null) {
      this.menuService.deleteItemMenu(id).subscribe(data => {
        this.listMainItemMenu.splice(index, 1);
      }, error => {
        console.log(error)
      });
    } else {
      this.menuService.deleteItemMenu(id).subscribe(data => {
        this.listMainItemMenu[index].childerItemMenu.splice(childIndex, 1);
      }, error => {
        console.log(error)
      });
    }
  }

  // private getMainitemsMenu(idBranch: number): void {
  //   this.listMainItemMenu = [];
  //   this.menuService.getMainitemsMenu(idBranch).subscribe(data => {
  //     data.result.forEach(menu => this.listMainItemMenu.push({
  //       idItemMenuOnBranch: menu.idItemMenuOnBranch,
  //       idItemMenu: menu.idItemMenu,
  //       showItem: menu.showItem,
  //       indexNumber: menu.indexNumber,
  //       nameRu: menu.nameRu,
  //       nameEn: menu.nameEn,
  //       nameKz: menu.nameKz,
  //       routeLink: menu.routeLink,
  //       description: menu.description,
  //       lastModifiedDate: menu.lastModifiedDate,
  //       typeItemMenu: {
  //         id: menu.typeItemMenu.id,
  //         nameType: menu.typeItemMenu.nameType,
  //         codeType: menu.typeItemMenu.codeType,
  //         description: menu.typeItemMenu.description
  //       }
  //     }))
  //     this.mainItemMenu = this.listMainItemMenu[0];
  //     this.getNestedItemsMenu(78);
  //   }, error => {
  //     console.log(error)
  //   });
  // }

  // getNestedItemsMenu(idBranch: number): void {
  //   this.getMainItemMenu();
  //   this.listNestedItemMenu = [];
  //   this.menuService.getNestedItemsMenu(idBranch, this.mainItemMenu!.idItemMenu).subscribe(data => {
  //       data.result.forEach(menu => this.listNestedItemMenu.push({
  //         idItemMenuOnBranch: menu.idItemMenuOnBranch,
  //         idItemMenu: menu.idItemMenu,
  //         showItem: menu.showItem,
  //         indexNumber: menu.indexNumber,
  //         nameRu: menu.nameRu,
  //         nameEn: menu.nameEn,
  //         nameKz: menu.nameKz,
  //         routeLink: menu.routeLink,
  //         description: menu.description,
  //         lastModifiedDate: menu.lastModifiedDate,
  //         typeItemMenu: {
  //           id: menu.typeItemMenu.id,
  //           nameType: menu.typeItemMenu.nameType,
  //           codeType: menu.typeItemMenu.codeType,
  //           description: menu.typeItemMenu.description
  //         }
  //       }))
  //     }, error => {
  //       console.log(error)
  //     }
  //   );
  // }

  getMainItemMenuEdit(): MenuObject {
    const index = this.listMainItemMenu.indexOf(this.mainItemMenu!);
    return this.listMainItemMenu[index];
  }

  // getMainItemMenu(): void {
  //   this.menuService.getMainitemMenu(this.mainItemMenu?.idItemMenuOnBranch!).subscribe(data => {
  //       const itemMenu = data.result[0];
  //       this.listMainItemMenu.forEach((value, index, array) => {
  //         if (value.idItemMenu === itemMenu.idItemMenu && value.idItemMenuOnBranch === itemMenu.idItemMenuOnBranch) {
  //           this.listMainItemMenu[index].showItem = itemMenu.showItem;
  //           this.listMainItemMenu[index].nameRu = itemMenu.nameRu;
  //           this.listMainItemMenu[index].nameKz = itemMenu.nameKz;
  //           this.listMainItemMenu[index].nameEn = itemMenu.nameEn;
  //           this.listMainItemMenu[index].typeItemMenu = itemMenu.typeItemMenu;
  //           this.listMainItemMenu[index].description = itemMenu.typeItemMenu;
  //           this.listMainItemMenu[index].indexNumber = itemMenu.indexNumber;
  //           this.listMainItemMenu[index].lastModifiedDate = itemMenu.indexNumber;
  //           this.listMainItemMenu[index].routeLink = itemMenu.routeLink;
  //         }
  //       });
  //     },
  //     error => {
  //       console.log(error)
  //     })
  // }

  getTypeItemMenu(): void {
    this.menuService.getTypesItemMenu().subscribe(data => {
      console.log(data)
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

  // updateVisibleItemMenu(): void {
  //   let listItemVisibleMenu = [];
  //   const itemMenu = {id: this.mainItemMenu?.idItemMenuOnBranch, visible: this.mainItemMenu?.showItem, mainPoint: true};
  //   listItemVisibleMenu.push(itemMenu);
  //   this.listNestedItemMenu.forEach(itemMenu => listItemVisibleMenu.push({
  //     id: itemMenu.idItemMenuOnBranch,
  //     visible: itemMenu.showItem,
  //     mainPoint: false
  //   }));
  //   this.getMainItemMenu();
  //   this.menuService.updateVisibleItemMenu(78, listItemVisibleMenu).subscribe(data => {
  //     this.menuService.updatedMenuPoints.emit(data);
  //   }, error => {
  //     this.getNestedItemsMenu(78);
  //     console.log(error);
  //   });
  // }

  // updateItemsMenuAdmin(): void {
  //   let listItemsMenu = [];
  //   const mainItemMenu = {
  //     idItemMenuOnBranch: this.mainItemMenu?.idItemMenuOnBranch,
  //     idItemMenu: this.mainItemMenu?.idItemMenu,
  //     idTypeItemMenu: this.mainItemMenu?.typeItemMenu.id,
  //     nameRu: this.mainItemMenu?.nameRu,
  //     nameEn: this.mainItemMenu?.nameEn,
  //     nameKz: this.mainItemMenu?.nameKz,
  //     showItem: this.mainItemMenu?.showItem,
  //     serialNumber: 0
  //   };
  //   listItemsMenu.push(mainItemMenu);
  //   this.listNestedItemMenu.forEach(itemMenu => listItemsMenu.push({
  //     idItemMenuOnBranch: itemMenu.idItemMenuOnBranch,
  //     idItemMenu: itemMenu.idItemMenu,
  //     idTypeItemMenu: itemMenu.typeItemMenu.id,
  //     nameRu: itemMenu.nameRu,
  //     nameEn: itemMenu.nameEn,
  //     nameKz: itemMenu.nameKz,
  //     showItem: itemMenu.showItem,
  //     serialNumber: 0
  //   }));
  //   this.menuService.updateItemsMenu(78, listItemsMenu).subscribe(data => {
  //     this.getMainItemMenu();
  //     this.updatedNestedItemMenu(data);
  //     this.edit = false;
  //   }, error => {
  //     this.getMainItemMenu();
  //     this.getNestedItemsMenu(78);
  //     this.edit = false;
  //     console.log(error)
  //   });
  // }

  updatedNestedItemMenu(d: DataObject): void {
    for (let resultElement of d.result) {
      // this.listNestedItemMenu.forEach((value, index, array) => {
      //   if (value.idItemMenu === resultElement.idItemMenu && value.idItemMenuOnBranch === resultElement.idItemMenuOnBranch) {
      //     array[index] = resultElement;
      //   }
      // })
    }
  }

  setTypeItemMenu(e: number, nestedItemMenu: MenuObject): void {
    this.listTypeItemMenu.forEach((value, index, array) => {
      if (e === value.id) {
        nestedItemMenu.typeItemMenu = value;
      }
    })
  }

  log() {
    // console.log(this.edit);
    console.log(this.listMainItemMenu);
    console.log(this.listTypeItemMenu);
    // console.log(this.listTypeItemMenu[0]);
    // console.log((this.listNestedItemMenu[0].typeItemMenu));
    // console.log(this.listTypeItemMenu[0] === this.listNestedItemMenu[0].typeItemMenu)
    // console.log(this.listMainItemMenu);
    // console.log(this.mainItemMenu);
    // console.log(this.listMainItemMenu.indexOf(this.listMainItemMenu[3]), "fdsfsdf");
    // console.log(this.updateVisibleItemMenu())
  }
}
