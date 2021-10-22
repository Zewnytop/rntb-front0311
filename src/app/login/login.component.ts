import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _login: string = "";
  private _password: string = "";

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  loginInSystem(): void {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.login + ":" + this.password)});
    const url = `/api/auth/user`;
    this.httpClient.get<any>(url, {headers: headers}).subscribe(data => {
      this.httpClient.get(`/api/auth/admin`).subscribe(data => {
        console.log(data);
      });
      // localStorage.setItem("BranchId", data);
      // this.router.navigate(['/admin-panel'])
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  test(): void {
    this.httpClient.get(`/api/auth/admin`).subscribe(data => {
      console.log(data);
    });
  }

  logout() {
    this.httpClient.post('logout', {}).subscribe(() => {
      // this.app.authenticated = false;
      this.router.navigateByUrl('/');
    });
  }

}
