import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-filial',
  templateUrl: './admin-filial.component.html',
  styleUrls: ['./admin-filial.component.css']
})
export class AdminFilialComponent implements OnInit {

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
