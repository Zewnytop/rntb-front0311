import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Route, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {UserStoreObject} from "../../site-object/user-object";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _login: string = "";
  private _password: string = "";

  private token = "";

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

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  fake(): void {
    this.userService.getUser(this.login).subscribe(data => {
      console.log(data);
      const user: UserStoreObject = {
        id: data.result.id,
        fio: data.result.fio,
        role: data.result.role,
        libraryBranch: data.result.libraryBranch
      };
      localStorage.setItem("user", JSON.stringify(user))
      console.log(JSON.parse(localStorage.getItem('user')!));
      // this.router.navigate(['/admin-panel']);
    }, error => {
      console.log(error);
    });
  }

  loginInSystem(): void {
    // const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.login + ":" + this.password)});
    // const url = `/api/auth/user`;
    // this.httpClient.get<any>(url, {headers: headers}).subscribe(data => {
    //   this.httpClient.get(`/api/auth/admin`).subscribe(data => {
    //     console.log(data);
    //   });
    //   // localStorage.setItem("BranchId", data);
    //   // this.router.navigate(['/admin-panel'])
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    // });
    const body = {
      login: this.login,
      password: this.password
    };
    this.httpClient.post<any>(`/api/auth/login`, body).subscribe(data => {
      console.log(data);
      this.token = data.token;
      // console.log("good");
      // localStorage.setItem("BranchId", "3");
      // this.router.navigate(['/admin-panel']);
    }, error => {
      console.log(error);
    });

  }

  test(): void {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
    });
    this.httpClient.get(`/api/book/list/3`, {headers: header}).subscribe(data => {
      console.log(data);
    });
  }

  logout() {
    this.httpClient.post('logout', {}).subscribe(() => {
      // this.app.authenticated = false;
      this.router.navigateByUrl('/');
    });
  }

  clear() {
    localStorage.removeItem('user');
  }
}
