import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private nameCooke = "Authorization";

  constructor() {
  }

  getCookie() {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + this.nameCooke.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  deleteCookie(): void {
    document.cookie = this.nameCooke + "=" + "; max-age=-1";
  }
}
