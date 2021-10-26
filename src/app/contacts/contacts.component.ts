import {Component, Input, OnInit} from '@angular/core';
import {SiteContactObject} from "../../site-object/site-component-object";
import {DomSanitizer} from "@angular/platform-browser";
import {SitePageService} from "../service/site-page.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private _id: number | null = null;
  private _branchContact: SiteContactObject | null = null;

  get id(): number | null {
    return this._id;
  }

  @Input()
  set id(value: number | null) {
    this._id = value;
  }

  get branchContact(): SiteContactObject | null {
    return this._branchContact;
  }

  set branchContact(value: SiteContactObject | null) {
    this._branchContact = value;
  }

  constructor(private sitePageService: SitePageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    this.sitePageService.getContact(this.id, "ru").subscribe(data => {
      this.branchContact = data.result;
    }, error => {
      console.log(error);
    });
  }

  getMapSrc(srcMap: string): any {
      return this.sanitizer.bypassSecurityTrustResourceUrl(srcMap);
  }
}
