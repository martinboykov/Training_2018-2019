import { Directive, ElementRef, OnInit, HostListener, Renderer, HostBinding } from '@angular/core';
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer) {

  }
  clicked = false;
  // short way using bootstrap class "open"
  // -------------------------------------
  // @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggle() {
  //   this.isOpen = !this.isOpen;
  // }

  // longer version using native css
  // -------------------------------------
  @HostListener('click', ['$event'])
  onClick(event) {
    if (!this.clicked) {
      this.renderer.setElementStyle(
        this.elementRef.nativeElement.nextSibling,
        'display',
        'block'
      );
      // this.elementRef.nativeElement.nextSibling.style.display = 'block';
      this.clicked = true;
    } else {
      this.renderer.setElementStyle(
        this.elementRef.nativeElement.nextSibling,
        'display',
        'none'
      );
      // this.elementRef.nativeElement.nextSibling.style.display = 'none';
      this.clicked = false;
    }

  }

  ngOnInit() {
  }
}
