import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-panel',
  templateUrl: './admin-user-panel.component.html',
  styleUrls: ['./admin-user-panel.component.css']
})
export class AdminUserPanelComponent implements OnInit {
  private _lang: string = "ru";

  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
