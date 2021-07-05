import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEntityTextSeletion]'
})
export class EntityTextSeletionDirective {

  constructor(private el: ElementRef) { }


  // @HostListener('mousedown') onMouseDown() {

  // }
  @HostListener('mouseup') onMouseup() {
    console.log(document.getSelection().toString());

  }
}
