import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor() { }

  public a = "http://localhost:8080/ru/#/sfdsfsd/asd"

  ngOnInit(): void {
    console.log("baseURI");
    console.log("http://localhost:8080/ru/");
    console.log("location");
    console.log(location.href);
    console.log(this.a.indexOf("ru"))
    console.log(this.a.split("/")[3])
  }

}
