import {Component, OnInit} from '@angular/core';
import {ContactObject, InternalContactObject, ViewContactObject} from "../../site-object/contact-object";
import {ContactService} from "../service/contact.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ListContactObject} from "../../site-object/menu-object";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css']
})
export class AdminContactsComponent implements OnInit {

  private _listViewContactBranch: ViewContactObject[] = [];

  private _contact: ContactObject | null = null;

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

  private _listContactBranch: ListContactObject[] = []

  private _contactBranch: ContactObject = {
    id: null,
    nameRu: null,
    nameEn: null,
    nameKz: null,
    address: null,
    email: null,
    phoneNumber: null,
    map: null,
    lastModifiedDate: null,
    iternalContact: []
  };

  mapStr = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.995163113485!2d76.91192371591033!3d43.25152317913716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883694bbe3cbd31%3A0x41d06ef0c602f3c4!2z0YPQuy4g0JzRg9C60LDQvdC-0LLQsCAyMjPQsiwg0JDQu9C80LDRgtGLIDA1MDAwMA!5e0!3m2!1sru!2skz!4v1628583965969!5m2!1sru!2skz";

  get contactBranch(): ContactObject {
    return this._contactBranch;
  }

  set contactBranch(value: ContactObject) {
    this._contactBranch = value;
  }

  get listContactBranch(): ListContactObject[] {
    return this._listContactBranch;
  }

  set listContactBranch(value: ListContactObject[]) {
    this._listContactBranch = value;
  }

  constructor(private contactService: ContactService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getContacts();
  }

  log(): void {
    console.log(this.contact);
    console.log(this.listViewContactBranch);
  }

  getContacts(): void {
    this.contactService.getListContact(1).subscribe(data => {
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

  createContactBranch(): void {
    this.contactService.createNewContact(1).subscribe(data => {
      console.log(data)
      const contact = data.result
      this.contactBranch = contact;
      this.listViewContactBranch.unshift({
        id: contact.id,
        name: contact.nameRu,
        lastModifiedDate: contact.lastModifiedDate,
        mainContact: contact.mainContact
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

  getContactBranch(idContact: number): void {
    this.contactService.getContactBranch(idContact).subscribe(data => {
      this.contact = data.result;
    }, error => {
      console.log(error);
    });
  }

  // choiceContactbranch(idContact: number): void {
  //   this.contactService.getContactBranch(idContact).subscribe(data => {
  //     this.contactBranch = data.result;
  //   }, error => {
  //     console.log(error)
  //   });
  // }

  clearObject(): void {
    this.contactBranch['id'] = null;
    this.contactBranch['nameRu'] = null;
    this.contactBranch['nameEn'] = null;
    this.contactBranch['nameKz'] = null;
    this.contactBranch['address'] = null;
    this.contactBranch['email'] = null;
    this.contactBranch['phoneNumber'] = null;
    this.contactBranch['map'] = null;
    this.contactBranch['iternalContact'] = [];
  }

  updateContact(): void {
    const contact = this.contactBranch;
    this.contactService.updateContact(contact).subscribe(data => console.log(data));
  }

  addIternalContact(): void {
    this.contactBranch.iternalContact.push({
      id: null,
      postRu: null,
      postEn: null,
      postKz: null,
      fioRu: null,
      fioEn: null,
      fioKz: null,
      phoneNumber: null,
      serialNumber: null
    });
  }

  deleteIternalContact(index: number): void {
    this.contactBranch.iternalContact.splice(index, 1);
  }

  getMapSrc(): any {
    const map = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapStr);
    return map;
  }
}
