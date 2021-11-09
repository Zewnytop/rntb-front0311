import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "../service/cookie.service";

@Component({
  selector: 'login',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private _roleCode: string | null = null;

  get roleCode(): string | null {
    return this._roleCode;
  }

  set roleCode(value: string | null) {
    this._roleCode = value;
  }

  constructor(private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this._roleCode = JSON.parse(localStorage.getItem('user')!).role.codeType;
  }

  exit() {
    this.cookieService.deleteCookie();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
