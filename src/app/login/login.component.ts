import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    const url = `/api/auth/login/${this.login}/${this.password}`;
    this.httpClient.get<any>(url).subscribe(data => {
      localStorage.setItem("BranchId", data);
      this.router.navigate(['/admin-panel'])
      // console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
