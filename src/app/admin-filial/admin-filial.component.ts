import {Component, OnInit} from '@angular/core';
import {LibraryBranchObject, LocalizationObject} from "../../site-object/libraryBranch-object";
import {BranchService} from "../service/branch.service";
import {SiteMenuObject} from "../../site-object/site-component-object";

@Component({
  selector: 'app-admin-filial',
  templateUrl: './admin-filial.component.html',
  styleUrls: ['./admin-filial.component.css']
})
export class AdminFilialComponent implements OnInit {

  private _listLibraryBranch: any[] = [];
  private _listLocalization: LocalizationObject[] = [];
  private _lang: string = "ru";

  get listLibraryBranch(): any[] {
    return this._listLibraryBranch;
  }

  set listLibraryBranch(value: any[]) {
    this._listLibraryBranch = value;
  }

  get listLocalization(): LocalizationObject[] {
    return this._listLocalization;
  }

  set listLocalization(value: LocalizationObject[]) {
    this._listLocalization = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  constructor(private branchService: BranchService) {
  }

  ngOnInit(): void {
    this.getListLang();
    this.getBranches();
  }

  getBranches(): void {
    this.branchService.getListLibraryBranch().subscribe(data => {
      this.listLibraryBranch = this.getNewListBranch(data.result);
    }, error => {
      console.log(error);
    });
  }

  updateInfoBranch(index: number): void {
    const branch = this.listLibraryBranch[index];
    const body = {
      id: branch.id,
      nameRu: branch.nameRu,
      nameEn: branch.nameEn,
      nameKz: branch.nameKz,
      domen: branch.domen,
      cityRu: branch.cityRu,
      cityEn: branch.cityEn,
      cityKz: branch.cityKz,
      showOnPage: branch.showOnPage
    };
    this.branchService.updateInfoLibararyBranch(body).subscribe(data => {
      branch.isEdit = false;
    }, error => {
      console.log(error);
      this.getBranch(branch.id, index);
      branch.isEdit = false;
    });
  }

  getBranch(idBranch: number, index: number): void {
    this.branchService.getBranch(idBranch).subscribe(data => {
      const bdBranch = data.result;
      const branch = this.listLibraryBranch[index];
      branch.nameRu = bdBranch.nameRu;
      branch.nameEn = bdBranch.nameEn;
      branch.nameKz = bdBranch.nameKz;
      branch.domen = bdBranch.domen;
      branch.cityRu = bdBranch.cityRu;
      branch.cityEn = bdBranch.cityEn;
      branch.cityKz = bdBranch.cityKz;
      branch.showOnPage = bdBranch.showOnPage
    }, error => {
      console.log(error);
    });
  }

  addNewBranch(): void {
    this.branchService.addBranch().subscribe(data => {
      const bdBranch = data.result;
      this.listLibraryBranch.push({
        id: bdBranch.id,
        nameRu: bdBranch.nameRu,
        nameEn: bdBranch.nameEn,
        nameKz: bdBranch.nameKz,
        domen: bdBranch.domen,
        cityRu: bdBranch.cityRu,
        cityEn: bdBranch.cityEn,
        cityKz: bdBranch.cityKz,
        showOnPage: bdBranch.showOnPage,
        isEdit: true
      });
    }, error => {
      console.log(error);
    });
  }

  getNewListBranch(listLibraryBranch: LibraryBranchObject[]): any[] {
    let listItem: any[] = [];
    if (listLibraryBranch && listLibraryBranch.length) {
      listLibraryBranch.forEach((item) => {
        let itemMenu: { [k: string]: any } = {
          id: item.id,
          nameRu: item.nameRu,
          nameEn: item.nameEn,
          nameKz: item.nameKz,
          domen: item.domen,
          cityRu: item.cityRu,
          cityEn: item.cityEn,
          cityKz: item.cityKz,
          showOnPage: item.showOnPage,
          isEdit: false
        };
        listItem.push(itemMenu);
      }, this);
    }
    return listItem;
  }

  getListLang(): void {
    this.listLocalization = [];
    this.branchService.getListLang().subscribe(data => {
      data.result.forEach(item => {
        this.listLocalization.push({
          id: item.id,
          nameLanguage: item.nameLanguage,
          code: item.code,
          enableLanguage: item.enableLanguage
        });
      });
    }, error => {
      console.log(error);
    });
  }

  updateLang(): void {
    let mass: any[] = [];
    this.listLocalization.forEach(item => {
      mass.push({
        id: item.id,
        enableLanguage: item.enableLanguage
      });
    });
    this.branchService.updateLang(mass).subscribe(() => {

    }, error => {
      console.log(error);
      this.getListLang();
    });
  }

  // deleteBranch(idBranch: number, index: number): void {
  //   this.branchService.deleteBranch(idBranch).subscribe(data => {
  //     this.listLibraryBranch.splice(index, 1);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  changeStatusEdit(item: any): void {
    item.isEdit = true;
  }

}
