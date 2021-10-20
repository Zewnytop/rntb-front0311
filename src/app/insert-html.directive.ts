import {Directive,ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[InsertHtml]'
})
export class InsertHtmlDirective {
  @Input('InsertHtml')
  set model(value: string | null) {
    this.elRef.nativeElement.innerHTML = value;
  }
  constructor(private elRef: ElementRef) {
  }

}
