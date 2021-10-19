import {Component, OnInit} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {MenuObject, TypeMenuItemObject} from "../../site-object/menu-object";
import {DataObject} from "../../site-object/data-object";

@Component({
  selector: 'app-admin-edit-menu',
  templateUrl: './admin-edit-menu.component.html',
  styleUrls: ['./admin-edit-menu.component.css']
})
export class AdminEditMenuComponent implements OnInit {

  private _listMainItemMenu: MenuObject[] = [];
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
    this.getMainitemsMenu(parseInt(localStorage.getItem("BranchId")!!));
    this.getTypeItemMenu();
  }

  createItemMenu(idParent: number | null = null, index: number | null = null): void {
    if (index === null && idParent === null) {
      this.menuService.createItemMenu(parseInt(localStorage.getItem("BranchId")!!), idParent).subscribe(data => {
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
          isEdit: true,
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
      this.menuService.createItemMenu(parseInt(localStorage.getItem("BranchId")!!), idParent).subscribe(data => {
        console.log(data)
        const itemMenu = data.result;
        this.listMainItemMenu[index!].childerItemMenu.push({
          id: itemMenu.id,
          showItem: itemMenu.showItem,
          serialNumber: itemMenu.serialNumber,
          nameRu: itemMenu.nameRu,
          nameEn: itemMenu.nameEn,
          nameKz: itemMenu.nameKz,
          description: itemMenu.description,
          lastModifiedDate: itemMenu.lastModifiedDate,
          isEdit: true,
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

  updateItemMenu(itemMenu: MenuObject | null): void {
    const body = {
      id: itemMenu!.id,
      nameRu: itemMenu?.nameRu,
      nameEn: itemMenu?.nameEn,
      nameKz: itemMenu?.nameKz,
      visible: itemMenu!.showItem,
      typeItemMenu: itemMenu?.typeItemMenu?.id
    };
    console.log(body);
    this.menuService.updateItemsMenu(body).subscribe(data => {
      itemMenu!.isEdit = false;
      const item = data.result;
      itemMenu!.nameRu = item.nameRu;
      itemMenu!.nameEn = item.nameEn;
      itemMenu!.nameKz = item.nameKz;
      itemMenu!.lastModifiedDate = item.lastModifiedDate;
      if (item.typeItemMenu !== null) {
        itemMenu!.typeItemMenu.id = item.typeItemMenu.id;
        itemMenu!.typeItemMenu.codeType = item.typeItemMenu.codeType;
        itemMenu!.typeItemMenu.nameType = item.typeItemMenu.nameType;
        itemMenu!.typeItemMenu.description = item.typeItemMenu.description;
      }
      itemMenu!.showItem = item.showItem;
    }, error => {
      this.menuService.getItemMenu(itemMenu!.id).subscribe(data => {
        console.log("error");
        const item = data.result;
        itemMenu!.nameRu = item.nameRu;
        itemMenu!.nameEn = item.nameEn;
        itemMenu!.nameKz = item.nameKz;
        itemMenu!.lastModifiedDate = item.lastModifiedDate;
        if (item.typeItemMenu !== null) {
          itemMenu!.typeItemMenu.id = item.typeItemMenu.id;
          itemMenu!.typeItemMenu.codeType = item.typeItemMenu.codeType;
          itemMenu!.typeItemMenu.nameType = item.typeItemMenu.nameType;
          itemMenu!.typeItemMenu.description = item.typeItemMenu.description;
        }
        itemMenu!.showItem = item.showItem;
      }, error => {
        console.log(error);
      });
      itemMenu!.isEdit = false;
      console.log(error);
    });
  }

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

  setTypeItemMenu(e: any, index: number, childIndex: number | null = null): void {
    let type = this.listTypeItemMenu.filter(type => type.id === parseInt(e))[0];
    if (childIndex === null) {
      this.listMainItemMenu[index].typeItemMenu = type;
    } else {
      this.listMainItemMenu[index].childerItemMenu[childIndex].typeItemMenu = type;
    }
  }

  changePositionDown(index: number, childIndex: number | null = null): void {
    let listItemMenu = [];
    let itemMenu: MenuObject | null = null;
    let nextItemMenu: MenuObject | null = null;
    if (childIndex === null) {
      itemMenu = this.listMainItemMenu[index];
      nextItemMenu = this.listMainItemMenu[index + 1];
      listItemMenu.push({
        id: itemMenu.id,
        serialNumber: nextItemMenu.serialNumber
      }, {
        id: nextItemMenu.id,
        serialNumber: itemMenu.serialNumber
      });
    } else {
      itemMenu = this.listMainItemMenu[index].childerItemMenu[childIndex];
      nextItemMenu = this.listMainItemMenu[index].childerItemMenu[childIndex + 1];
      listItemMenu.push({
        id: itemMenu.id,
        serialNumber: nextItemMenu.serialNumber
      }, {
        id: nextItemMenu.id,
        serialNumber: itemMenu.serialNumber
      });
    }
    this.menuService.updatePositionItemMenu(listItemMenu).subscribe(data => {
      if (childIndex === null) {
        this.listMainItemMenu[index] = nextItemMenu!;
        this.listMainItemMenu[index + 1] = itemMenu!;
        const serialNumber = this.listMainItemMenu[index].serialNumber;
        const nextSerialNumber = this.listMainItemMenu[index + 1].serialNumber;
        this.listMainItemMenu[index].serialNumber = nextSerialNumber;
        this.listMainItemMenu[index + 1].serialNumber = serialNumber;
      } else {
        this.listMainItemMenu[index].childerItemMenu[childIndex] = nextItemMenu!;
        this.listMainItemMenu[index].childerItemMenu[childIndex + 1] = itemMenu!;
        const serialNumber = this.listMainItemMenu[index].childerItemMenu[childIndex].serialNumber;
        const nextSerialNumber = this.listMainItemMenu[index].childerItemMenu[childIndex + 1].serialNumber;
        this.listMainItemMenu[index].childerItemMenu[childIndex].serialNumber = nextSerialNumber;
        this.listMainItemMenu[index].childerItemMenu[childIndex + 1].serialNumber = serialNumber;
      }
    }, error => {
      console.log(error);
    });
  }

  changePositionUp(index: number, childIndex: number | null = null): void {
    let listItemMenu = [];
    let itemMenu: MenuObject | null = null;
    let nextItemMenu: MenuObject | null = null;
    if (childIndex === null) {
      itemMenu = this.listMainItemMenu[index];
      nextItemMenu = this.listMainItemMenu[index - 1];
      listItemMenu.push({
        id: itemMenu.id,
        serialNumber: nextItemMenu.serialNumber
      }, {
        id: nextItemMenu.id,
        serialNumber: itemMenu.serialNumber
      });
    } else {
      itemMenu = this.listMainItemMenu[index].childerItemMenu[childIndex];
      nextItemMenu = this.listMainItemMenu[index].childerItemMenu[childIndex - 1];
      listItemMenu.push({
        id: itemMenu.id,
        serialNumber: nextItemMenu.serialNumber
      }, {
        id: nextItemMenu.id,
        serialNumber: itemMenu.serialNumber
      });
    }
    this.menuService.updatePositionItemMenu(listItemMenu).subscribe(data => {
      if (childIndex === null) {
        this.listMainItemMenu[index] = nextItemMenu!;
        this.listMainItemMenu[index - 1] = itemMenu!;
        const serialNumber = this.listMainItemMenu[index].serialNumber;
        const nextSerialNumber = this.listMainItemMenu[index - 1].serialNumber;
        this.listMainItemMenu[index - 1].serialNumber = serialNumber;
        this.listMainItemMenu[index].serialNumber = nextSerialNumber;
      } else {
        this.listMainItemMenu[index].childerItemMenu[childIndex] = nextItemMenu!;
        this.listMainItemMenu[index].childerItemMenu[childIndex - 1] = itemMenu!;
        const serialNumber = this.listMainItemMenu[index].childerItemMenu[childIndex].serialNumber;
        const nextSerialNumber = this.listMainItemMenu[index].childerItemMenu[childIndex - 1].serialNumber;
        this.listMainItemMenu[index].childerItemMenu[childIndex - 1].serialNumber = serialNumber;
        this.listMainItemMenu[index].childerItemMenu[childIndex].serialNumber = nextSerialNumber;
      }
    }, error => {
      console.log(error);
    });
  }

  log() {
    // console.log(this.edit);
    console.log(this.listMainItemMenu);
    console.log(this.listTypeItemMenu);
    console.log(document.baseURI)
    const ur = "http://rntb.timir.kz/";
    const ur2 = "https://ast.rntb.timir.kz/";
    const ur3 = ur.replace(/.*\/\//, '');
    const ur4 = ur2.replace(/.*\/\//, '');
    console.log(ur3)
    console.log(ur3.replace('/', ''))
    // console.log(ur3.split('.', 1))
    // console.log(ur4.split('.', 1))

    // console.log(this.listTypeItemMenu[0]);
    // console.log((this.listNestedItemMenu[0].typeItemMenu));
    // console.log(this.listTypeItemMenu[0] === this.listNestedItemMenu[0].typeItemMenu)
    // console.log(this.listMainItemMenu);
    // console.log(this.mainItemMenu);
    // console.log(this.listMainItemMenu.indexOf(this.listMainItemMenu[3]), "fdsfsdf");
    // console.log(this.updateVisibleItemMenu())
  }
}
