import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
