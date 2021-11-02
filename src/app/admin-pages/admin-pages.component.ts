import {Component, OnInit} from '@angular/core';
import {ViewVirtualExhibitionObject} from "../../site-object/view-virtual-exhibition-object";
import {VirtualExhibitionService} from "../service/virtual-exhibition.service";
import {ViewContactObject} from "../../site-object/contact-object";
import {ContactService} from "../service/contact.service";
import {HttpClient} from "@angular/common/http";
import {PageObject, ViewPageObject} from "../../site-object/page-object";
import {PageService} from "../service/page.service";
import {TypeComponentObject} from "../../site-object/typeComponent-object";


@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  private _listCategoryVirtualExhibition: ViewVirtualExhibitionObject[] = [];
  private _listViewContactBranch: ViewContactObject[] = [];
  private _listViewPages: ViewPageObject[] = [];
  private _listTypeComponent: TypeComponentObject[] = [];
  private _selectedPage: PageObject | null = null;
  private _selectedTypeComponent: string | null = null;
  private _lang: string = "ru";

  get listCategoryVirtualExhibition(): ViewVirtualExhibitionObject[] {
    return this._listCategoryVirtualExhibition;
  }

  set listCategoryVirtualExhibition(value: ViewVirtualExhibitionObject[]) {
    this._listCategoryVirtualExhibition = value;
  }

  get listViewContactBranch(): ViewContactObject[] {
    return this._listViewContactBranch;
  }

  set listViewContactBranch(value: ViewContactObject[]) {
    this._listViewContactBranch = value;
  }

  get listViewPages(): ViewPageObject[] {
    return this._listViewPages;
  }

  set listViewPages(value: ViewPageObject[]) {
    this._listViewPages = value;
  }

  get listTypeComponent(): TypeComponentObject[] {
    return this._listTypeComponent;
  }

  set listTypeComponent(value: TypeComponentObject[]) {
    this._listTypeComponent = value;
  }

  get selectedPage(): PageObject | null {
    return this._selectedPage;
  }

  set selectedPage(value: PageObject | null) {
    this._selectedPage = value;
  }

  get selectedTypeComponent(): string | null {
    return this._selectedTypeComponent;
  }

  set selectedTypeComponent(value: string | null) {
    this._selectedTypeComponent = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  constructor(private virtualExhibitionService: VirtualExhibitionService,
              private contactService: ContactService,
              private httpClient: HttpClient,
              private pageService: PageService) {
  }

  ngOnInit(): void {
    this.getListTypeComponent();
    this.getCategories();
    this.getContacts();
    this.getPages();
  }

  getListTypeComponent(): void {
    this.pageService.getListTypeComponent().subscribe(data => {
      data.result.forEach(item => {
        this.listTypeComponent.push({
          id: item.id,
          name: item.name,
          code: item.code,
          description: item.description
        });
      });
      this.selectedTypeComponent = this.listTypeComponent[0].code;
    }, error => {
      console.log(error);
    });
  }

  getCategories(): void {
    this.virtualExhibitionService.getCategories(parseInt(localStorage.getItem("BranchId")!!)).subscribe(data => {
      data.result.forEach(category => {
        this.listCategoryVirtualExhibition.push({
          id: category.id,
          nameRu: category.nameRu,
          nameEn: category.nameEn,
          nameKz: category.nameKz,
          isEdit: false,
          lastModifiedDate: category.lastModifiedDate,
          typeComponent: category.typeComponent,
          libraryBranch: category.libraryBranch
        });
      });
    }, error => {
      console.log(error);
    });
  }

  getContacts(): void {
    this.contactService.getListContact(parseInt(localStorage.getItem("BranchId")!!)).subscribe(data => {
      data.result.forEach((value) => this.listViewContactBranch.push({
        id: value.id,
        name: value.name,
        lastModifiedDate: value.lastModifiedDate,
        mainContact: value.mainContact,
        typeComponent: value.typeComponent
      }));
    }, error => {
      console.log(error)
    });
  }


  createPage(): void {
    this.pageService.createPage(10).subscribe(data => {
      this.listViewPages.push({
        id: data.result.id,
        nameRu: data.result.nameRu,
        nameEn: data.result.nameEn,
        nameKz: data.result.nameKz,
        isEdit: true
      });
    }, error => {
      console.log(error);
    });
  }

  getPages(): void { //TODO
    this.pageService.getListPage(10).subscribe(data => {
      data.result.forEach(page => {
        this.listViewPages.push({
          id: page.id,
          nameRu: page.nameRu,
          nameEn: page.nameEn,
          nameKz: page.nameKz,
          isEdit: false
        });
      });
    }, error => {
      console.log(error);
    });
  }

  getPage(idPage: number): void {
    this.pageService.getPage(idPage).subscribe(data => {
      this.selectedPage = data.result;
      console.log(this.selectedPage);
    }, error => {
      console.log(error);
    });
  }

  addComponentOnPage(idComponent: number, typeComponent: TypeComponentObject): void {
    if (this.selectedPage) {
      const body = {
        idPage: this.selectedPage.id,
        idComponent: idComponent,
        typeComponent: typeComponent
      };
      this.pageService.addComponentOnpage(body).subscribe(data => {
        console.log(data);
        const newComponent = data.result;
        this.selectedPage?.components.push({
          id: newComponent.id,
          idComponent: newComponent.idComponent,
          name: newComponent.name,
          typeComponent: newComponent.typeComponent,
          serialNumber: newComponent.serialNumber,
        });
      }, error => {
        console.log(error);
      });
    }
  }

  updateInfoPage(page: ViewPageObject): void {
    this.pageService.updateInfoPage(page.id, page).subscribe(data => {
      page.isEdit = false;
    }, error => {
      this.pageService.getPage(page.id).subscribe(data => {
        page.nameRu = data.result.nameRu;
        page.nameEn = data.result.nameEn;
        page.nameKz = data.result.nameKz;
      }, error1 => {
        console.log(error1)
      });
      page.isEdit = false;
      console.log(error);
    });
  }

  deleteComponentOnPage(idComponent: number, index: number): void {
    this.pageService.deleteComponentOnPage(idComponent).subscribe(data => {
      this.selectedPage?.components.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  blockButtonAddComponent(idComponent: number): boolean {
    let block = false;
    if (this.selectedPage && this.selectedPage.components.length) {
      for (let component of this.selectedPage.components) {
        if (component.idComponent === idComponent) {
          return true;
        }
      }
    }
    return block;
  }

  changeEditStatus(item: ViewPageObject): void {
    if (item.isEdit) {
      item.isEdit = false;
    } else {
      item.isEdit = true;
    }
  }

  deletePage(idPage: number, index: number): void {
    this.pageService.deletePage(idPage).subscribe(data => {
      this.listViewPages.splice(index, 1);
      this.selectedPage = null;
    }, error => {
      console.log(error);
    });
  }

  changePositionUp(index: number): void {
    let listPosition = [];
    const componentPage = this.selectedPage!.components[index];
    const nextComponentPage = this.selectedPage!.components[index - 1];
    listPosition.push({
      id: componentPage?.id,
      serialNumber: nextComponentPage?.serialNumber
    }, {
      id: nextComponentPage?.id,
      serialNumber: componentPage?.serialNumber
    });
    this.pageService.updatePositionComponentOnPage(listPosition).subscribe(data => {
      this.selectedPage!.components[index] = nextComponentPage;
      this.selectedPage!.components[index - 1] = componentPage;
      const serialNumber = this.selectedPage!.components[index].serialNumber;
      const nextSerialNumber = this.selectedPage!.components[index - 1].serialNumber;
      this.selectedPage!.components[index].serialNumber = nextSerialNumber;
      this.selectedPage!.components[index - 1].serialNumber = serialNumber;
    }, error => {
      console.log(error);
    });
    console.log(this.selectedPage);
  }

  changePositionDown(index: number): void {
    let listPosition = [];
    const componentPage = this.selectedPage!.components[index];
    const nextComponentPage = this.selectedPage!.components[index + 1];
    listPosition.push({
      id: componentPage?.id,
      serialNumber: nextComponentPage?.serialNumber
    }, {
      id: nextComponentPage?.id,
      serialNumber: componentPage?.serialNumber
    });
    this.pageService.updatePositionComponentOnPage(listPosition).subscribe(data => {
      this.selectedPage!.components[index] = nextComponentPage;
      this.selectedPage!.components[index + 1] = componentPage;
      const serialNumber = this.selectedPage!.components[index].serialNumber;
      const nextSerialNumber = this.selectedPage!.components[index + 1].serialNumber;
      this.selectedPage!.components[index].serialNumber = nextSerialNumber;
      this.selectedPage!.components[index + 1].serialNumber = serialNumber;
    }, error => {
      console.log(error);
    });
    console.log(this.selectedPage);
  }

  log() {
    console.log(this.selectedTypeComponent)
  }
}
