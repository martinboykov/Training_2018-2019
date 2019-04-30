import { Directive, ElementRef, OnInit, HostListener, Renderer, HostBinding } from '@angular/core';
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer) {

  }
  clicked = true;
  // short way using bootstrap class "open"
  // -------------------------------------
  // @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggle() {
  //   this.isOpen = !this.isOpen;
  // }

  // longer version using native css
  // -------------------------------------
  @HostListener('click', ['$event']) onClick(event) {
    if (this.clicked) {
      this.renderer.setElementStyle(
        this.elementRef.nativeElement.nextSibling,
        'display',
        'block'
      );
      this.clicked = !this.clicked;
    } else {
      this.renderer.setElementStyle(
        this.elementRef.nativeElement.nextSibling,
        'display',
        'none'
      );
      this.clicked = !this.clicked;
    }
  }
  // @HostListener('focus', ['$event']) onFocus(event) {

  //   this.renderer.setElementStyle(
  //     this.elementRef.nativeElement.nextSibling,
  //     'display',
  //     'block'
  //   );
  //   // this.elementRef.nativeElement.nextSibling.style.display = 'block';

  // }
  // @HostListener('blur', ['$event']) onBlur(event) {

  //   this.renderer.setElementStyle(
  //     this.elementRef.nativeElement.nextSibling,
  //     'display',
  //     'none'
  //   );
  //   this.clicked = !this.clicked;
  //   // this.elementRef.nativeElement.nextSibling.style.display = 'block';
  // }

  ngOnInit() {
  }
}
