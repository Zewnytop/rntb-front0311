import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {LibraryBranchStoreObject, UserObject, UserRoleStoreObject} from "../../site-object/user-object";
import {FileService} from "../service/file.service";
import {BranchService} from "../service/branch.service";
import {LibraryBranchObject} from "../../site-object/libraryBranch-object";

@Component({
  selector: 'app-admin-user-panel',
  templateUrl: './admin-user-panel.component.html',
  styleUrls: ['./admin-user-panel.component.css']
})
export class AdminUserPanelComponent implements OnInit {

  private _listUser: UserObject[] = [];
  private _listBranch: LibraryBranchObject[] = [];
  private _selectedBranch: LibraryBranchObject | null = null;
  private _errormessage: string | null = null;
  private _edit: boolean = false;


  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }

  get listUser(): UserObject[] {
    return this._listUser;
  }

  set listUser(value: UserObject[]) {
    this._listUser = value;
  }

  get listBranch(): LibraryBranchObject[] {
    return this._listBranch;
  }

  set listBranch(value: LibraryBranchObject[]) {
    this._listBranch = value;
  }

  get selectedBranch(): LibraryBranchObject | null {
    return this._selectedBranch;
  }

  set selectedBranch(value: LibraryBranchObject | null) {
    this._selectedBranch = value;
  }

  get errormessage(): string | null {
    return this._errormessage;
  }

  set errormessage(value: string | null) {
    this._errormessage = value;
  }

  constructor(private userService: UserService, private branchService: BranchService) {
  }

  ngOnInit(): void {
    this.getListBranch();
  }

  log(): void {
    console.log(this.selectedBranch);
    console.log(this.listUser);
  }

  getListBranch(): void {
    this.errormessage = null;
    this.branchService.getListLibraryBranch().subscribe(data => {
      data.result.forEach(item => {
        this.listBranch.push({
          id: item.id,
          nameRu: item.nameRu,
          nameEn: item.nameEn,
          nameKz: item.nameKz,
          domen: item.domen,
          cityRu: item.cityRu,
          cityEn: item.cityEn,
          cityKz: item.cityKz,
          showOnPage: item.showOnPage
        });
      });
      this.selectedBranch = this.listBranch[0];
      this.getListUser();
    }, error => {
      console.log(error);
    });
  }

  getListUser(): void {
    this.errormessage = null;
    this.listUser = [];
    this.userService.getListUser(this.selectedBranch!.id).subscribe(data => {
      console.log(data)
      data.result.forEach(item => {
        this.listUser.push({
          id: item.id,
          login: item.login,
          password: null,
          fio: item.fio,
          branchAccess: item.branchAccess,
          isEdit: false,
          role: item.role,
          libraryBranch: item.libraryBranch
        });
      });
    }, error => {
      console.log(error);
    });
  }

  addUser(): void {
    this.errormessage = null;
    this.listUser.push({
        id: null,
        login: null,
        password: null,
        fio: null,
        branchAccess: true,
        isEdit: true,
        role: null,
        libraryBranch: null
      }
    );
  }

  createUser(user: UserObject, index: number): void {
    this.errormessage = null;
    const body = {
      login: user.login,
      fio: user.fio,
      password: user.password,
      branchAccess: user.branchAccess,
      libraryBranchId: this.selectedBranch?.id,
    };
    this.userService.createUser(body).subscribe(data => {
      const user = data.result;
      this.listUser[index].id = user.id;
      this.listUser[index].login = user.login;
      this.listUser[index].password = null;
      this.listUser[index].branchAccess = user.branchAccess;
      this.listUser[index].isEdit = false;
      this.listUser[index].libraryBranch = user.libraryBranch;
      this.listUser[index].role = user.role;
      // this.listUser.push({
      //   id: user.id,
      //   login: user.login,
      //   password: null,
      //   fio: user.fio,
      //   branchAccess: user.branchAccess,
      //   isEdit: true,
      //   role: user.role,
      //   libraryBranch: user.libraryBranch
      // });
    }, error => {
      this.errormessage = error.error.error;
      console.log(error);
    });
  }

  updateUser(user: UserObject, index: number): void {
    this.errormessage = null;
    const body = {
      id: user.id,
      login: user.login,
      fio: user.fio,
      branchAccess: user.branchAccess
    };
    this.userService.updateUser(body).subscribe(() => {
      user.isEdit = false;
    }, error => {
      console.log(error);
      this.errormessage = error.error.error;
      this.getUser(user.id!, index);
    });
  }

  getUser(idUser: number, index: number): void {
    this.userService.getUser(idUser).subscribe(data => {
      const user = data.result;
      this.listUser[index].login = user.login;
      this.listUser[index].fio = user.fio;
      this.listUser[index].branchAccess = user.branchAccess;
    }, error => {
      console.log(error);
    });
  }

  deleteUser(idUser: number | null | undefined, index: number): void {
    this.errormessage = null;
    if (idUser) {
      this.userService.deleteUser(idUser).subscribe(() => {
        this.listUser.splice(index, 1);
      }, error => {
        this.errormessage = error.error.error;
        console.log(error);
      });
    } else {
      this.listUser.splice(index, 1);
    }
  }

  setBranch(idBranch: number): void {
    this.selectedBranch = this.listBranch.filter(item => item.id == idBranch)[0];
    this.getListUser();
  }

  changeEditStatus(user: UserObject): void {
    user.isEdit = !user.isEdit;
  }


}
