import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  prmn = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11628.112992163966!2d76.92747116088864!3d43.22986739302978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f20c57dc4ff%3A0xd15d1f5c219478e3!2z0JPQvtGA0L7QtNGB0LrQvtC1INGD0L_RgNCw0LLQu9C10L3QuNC1INC00L7RgNC-0LbQvdC-0Lkg0L_QvtC70LjRhtC40Lg!5e0!3m2!1sru!2skz!4v1634704508239!5m2!1sru!2skz\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>";
  constructor() { }

  ngOnInit(): void {
  }

}
