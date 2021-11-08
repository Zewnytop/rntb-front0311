import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "../service/cookie.service";

@Component({
  selector: 'login',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  exit() {
    this.cookieService.deleteCookie();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
