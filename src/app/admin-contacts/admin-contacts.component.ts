import {Component, OnInit} from '@angular/core';
import {ContactObject, InternalContactObject, ViewContactObject} from "../../site-object/contact-object";
import {ContactService} from "../service/contact.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css']
})
export class AdminContactsComponent implements OnInit {

  private _listViewContactBranch: ViewContactObject[] = [];
  private _contact: ContactObject | null = null;
  private _lang: string = "ru";
  private _errorMessage: string | null = null;
  private _blockCheckBox: boolean = false;
  private _edit: boolean = false;


  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }

  regKrt(e: Event): any {
    // @ts-ignore
    this.contact!.map = (e.target as HTMLInputElement).value.match(/.iframe.*src="([^"]*)"/)[1]

  }

  get listViewContactBranch(): ViewContactObject[] {
    return this._listViewContactBranch;
  }

  set listViewContactBranch(value: ViewContactObject[]) {
    this._listViewContactBranch = value;
  }

  get contact(): ContactObject | null {
    return this._contact;
  }

  set contact(value: ContactObject | null) {
    this._contact = value;
  }

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }

  get errorMessage(): string | null {
    return this._errorMessage;
  }

  set errorMessage(value: string | null) {
    this._errorMessage = value;
  }

  get blockCheckBox(): boolean {
    return this._blockCheckBox;
  }

  set blockCheckBox(value: boolean) {
    this._blockCheckBox = value;
  }

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.getContacts();
  }

  // log(): void {
  //   console.log(this.contact);
  //   console.log(this.listViewContactBranch);
  // }

  getContacts(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.contactService.getListContact(idBranch).subscribe(data => {
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

  createContactBranch(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.contactService.createNewContact(idBranch).subscribe(data => {
      console.log(data);
      const contact = data.result;
      this.listViewContactBranch.unshift({
        id: contact.id,
        name: contact.nameRu,
        lastModifiedDate: contact.lastModifiedDate,
        mainContact: contact.mainContact,
        typeComponent: contact.typeComponent
      });
      this.getContactBranch(contact.id);
    }, error => {
      console.log(error);
    });
  }

  createIternalContact(): void {
    this.contactService.createNewItertnalContact(this.contact!.id!).subscribe(data => {
      const iternalContact = data.result;
      this.contact?.iternalContact.push({
        id: iternalContact.id,
        postRu: iternalContact.postRu,
        postEn: iternalContact.postEn,
        postKz: iternalContact.postKz,
        fioRu: iternalContact.fioRu,
        fioEn: iternalContact.fioEn,
        fioKz: iternalContact.fioKz,
        phoneNumber: iternalContact.phoneNumber,
        serialNumber: iternalContact.serialNumber
      });
    }, error => {
      console.log(error);
    });
  }

  getContactBranch(idContact: number): void {
    this.contactService.getContactBranch(idContact).subscribe(data => {
      this.contact = data.result;
      this.changeStatusMainContact();
    }, error => {
      console.log(error);
    });
  }

  changeStatusMainContact(): void {
    this.listViewContactBranch.forEach(viewContact => {
      if (viewContact.mainContact) {
        if (viewContact.id !== this.contact!.id) {
          this.errorMessage = "Уже выбран главный контакт - " + viewContact.name;
          this.blockCheckBox = true;
        } else {
          this.errorMessage = null;
          this.blockCheckBox = false;
        }
      }
    });
  }

  changePositionUp(index: number) {
    let listIternalContact = [];
    let iternalContact: InternalContactObject | null;
    let nextIternalContact: InternalContactObject | null;
    iternalContact = this.contact!.iternalContact[index];
    nextIternalContact = this.contact!.iternalContact[index - 1];
    listIternalContact.push({
      id: iternalContact.id,
      serialNumber: nextIternalContact.serialNumber
    }, {
      id: nextIternalContact.id,
      serialNumber: iternalContact.serialNumber
    });
    this.contactService.updatePositionIternalContact(listIternalContact).subscribe(data => {
      this.contact!.iternalContact[index] = nextIternalContact!;
      this.contact!.iternalContact[index - 1] = iternalContact!;
      const serialNumber = this.contact!.iternalContact[index].serialNumber;
      const nextSerialNumber = this.contact!.iternalContact[index - 1].serialNumber;
      this.contact!.iternalContact[index].serialNumber = nextSerialNumber;
      this.contact!.iternalContact[index - 1].serialNumber = serialNumber;
    }, error => {
      console.log(error);
    });
  }

  changePositionDown(index: number) {
    let listIternalContact = [];
    let iternalContact: InternalContactObject | null;
    let nextIternalContact: InternalContactObject | null;
    iternalContact = this.contact!.iternalContact[index];
    nextIternalContact = this.contact!.iternalContact[index + 1];
    listIternalContact.push({
      id: iternalContact.id,
      serialNumber: nextIternalContact.serialNumber
    }, {
      id: nextIternalContact.id,
      serialNumber: iternalContact.serialNumber
    });
    this.contactService.updatePositionIternalContact(listIternalContact).subscribe(data => {
      this.contact!.iternalContact[index] = nextIternalContact!;
      this.contact!.iternalContact[index + 1] = iternalContact!;
      const serialNumber = this.contact!.iternalContact[index].serialNumber;
      const nextSerialNumber = this.contact!.iternalContact[index + 1].serialNumber;
      this.contact!.iternalContact[index].serialNumber = nextSerialNumber;
      this.contact!.iternalContact[index + 1].serialNumber = serialNumber;
    }, error => {
      console.log(error);
    });
  }

  deleteContact(idContact: number, index: number): void {
    this.contactService.deleteContact(idContact).subscribe(data => {
      if (this.listViewContactBranch[index].id === this.contact?.id) {
        this.contact = null;
      }
      this.listViewContactBranch.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  deleteIternalContact(idIternalContact: number, index: number): void {
    this.contactService.deleteIternalContact(idIternalContact).subscribe(data => {
      this.contact?.iternalContact.splice(index, 1);
    }, error => {
      console.log(error);
      this.getContactBranch(this.contact!.id!);
    });
  }

  updateContact(): void {
    const contact = this.contact;
    this.contactService.updateContact(contact!).subscribe(data => {
      this.listViewContactBranch.forEach(value => {
        if (value.id === contact?.id) {
          value.name = contact.nameRu;
          value.mainContact = contact.mainContact!;
        }
      });
    }, error => {
      console.log(error);
      this.getContactBranch(this.contact!.id!);
    });
  }

}
