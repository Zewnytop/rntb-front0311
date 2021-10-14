import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  status: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeStatus(): void {
    if (this.status) {
      this.status = false;
    } else {
      this.status = true;
    }
  }

}
