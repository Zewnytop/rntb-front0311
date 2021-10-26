import {Component, OnInit} from '@angular/core';
import {AdminGalleryComponent} from "../admin-gallery/admin-gallery.component";
import {ViewVirtualExhibitionObject} from "../../site-object/view-virtual-exhibition-object";
import {VirtualExhibitionService} from "../service/virtual-exhibition.service";
import {ViewContactObject} from "../../site-object/contact-object";
import {ContactService} from "../service/contact.service";
import {HttpClient} from "@angular/common/http";
import {PageComponentObject, PageObject, ViewPages} from "../../site-object/page-object";
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
  private _listViewPages: ViewPages[] = [];
  private _selectedPage: PageObject | null = null;
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

  get listViewPages(): ViewPages[] {
    return this._listViewPages;
  }

  set listViewPages(value: ViewPages[]) {
    this._listViewPages = value;
  }

  get selectedPage(): PageObject | null {
    return this._selectedPage;
  }

  set selectedPage(value: PageObject | null) {
    this._selectedPage = value;
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
    this.getCategories();
    this.getContacts();
    this.getPages();
  }

  getCategories(): void {
    this.virtualExhibitionService.getCategories(parseInt(localStorage.getItem("BranchId")!!)).subscribe(data => {
      data.result.forEach(category => {
        this.listCategoryVirtualExhibition.push({
          id: category.id,
          nameRu: category.nameRu,
          nameEn: category.nameEn,
          nameKz: category.nameKz,
          showOnPage: category.showOnPage,
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
    const url = `/api/build/page/new/page`;
    this.httpClient.post<any>(url, null).subscribe((data) => {
      // this.listPage.push({
      //   id: data.id,
      //   name: data.name,
      //   component: []
      // });
    }, error => {
      console.log(error);
    });
  }

  getPages(): void { //TODO
    this.pageService.getListPage(3).subscribe(data => {
      data.result.forEach(page => {
        this.listViewPages.push({
          id: page.id,
          name: page.name
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

  savePage(): void {
  }

}
