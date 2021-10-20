import {Component, OnInit} from '@angular/core';
import {AdminGalleryComponent} from "../admin-gallery/admin-gallery.component";
import {ViewVirtualExhibitionObject} from "../../site-object/view-virtual-exhibition-object";
import {VirtualExhibitionService} from "../service/virtual-exhibition.service";
import {ViewContactObject} from "../../site-object/contact-object";
import {ContactService} from "../service/contact.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  private _listCategoryVirtualExhibition: ViewVirtualExhibitionObject[] = [];
  private _listViewContactBranch: ViewContactObject[] = [];
  private _listPage: any[] = [];
  private _lang: string = "ru";
  private _selectedPage: {
    id: number,
    name: string,
    component: [any]
  } | null = null;

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

  get listPage(): any[] {
    return this._listPage;
  }

  set listPage(value: any[]) {
    this._listPage = value;
  }

  get selectedPage(): { id: number; name: string; component: [any] } | null {
    return this._selectedPage;
  }

  set selectedPage(value: { id: number; name: string; component: [any] } | null) {
    this._selectedPage = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  constructor(private virtualExhibitionService: VirtualExhibitionService, private contactService: ContactService, private httpClient: HttpClient) {
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
        mainContact: value.mainContact
      }));
    }, error => {
      console.log(error)
    });
  }

  createPage(): void {
    const url = `/api/build/page/new/page`;
    this.httpClient.post<any>(url, null).subscribe((data) => {
      this.listPage.push({
        id: data.id,
        name: data.name,
        component: []
      });
    }, error => {
      console.log(error);
    });
  }

  getPages(): void {
    const url = `/api/build/page/pages`;
    this.httpClient.get<any>(url).subscribe(data => {
      data.forEach((item: any) => {
        this.listPage.push({
          id: item.id,
          name: item.name
        });
      });
    }, error => {
      console.log(error);
    });
  }

  selectPage(index: number): void {
    const id = this.listPage[index].id;
    const url = `/api/build/page/pages/${id}`;
    this.httpClient.get<any>(url).subscribe(data => {
      console.log(data);
      this.selectedPage = data;
      // this.selectedPage!.id = data.id;
      // this.selectedPage!.name = data.name;
      // this.selectedPage!.component = data.component;
    }, error => {
      console.log(error);
    });
  }

  addCompoennentOnPage(component: any): void {
    if (component.typeComponent) {
      this.selectedPage!.component.push(component);
    } else {
      this.selectedPage!.component.push(component);
    }
    console.log(this.selectedPage);
  }

  savePage(): void {
    let mass: any[] = [];
    this.selectedPage?.component.forEach(item => {
      mass.push({
        id: this.selectedPage?.id,
        idComponent: item.id,
        type: item.typeComponent?.code
      });
    });
    const url = `/api/build/page/save`;
    this.httpClient.post(url, mass).subscribe(data => {

    }, error => {

    });
  }

}
