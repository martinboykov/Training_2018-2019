import { Directive, Renderer, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer) {

  }
  @Input() defaultColor = 'black';
  @Input() highlightColor = 'white';

  @HostBinding('style.color') color;

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // console.log(eventData); // outputs undefined ?!?
    this.renderer.setElementStyle(
      this.elementRef.nativeElement,
      'background-color',
      'red'
    );
    // this.color = 'white';
    this.color = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // console.log(eventData); // outputs undefined ?!?
    this.renderer.setElementStyle(
      this.elementRef.nativeElement,
      'background-color',
      'transparent'
    );
    // this.color = 'black';
    this.color = this.defaultColor;
  }
  ngOnInit() {
    // this.renderer.setElementStyle(
    //   this.elementRef.nativeElement,
    //   'background-color',
    //   'red'
    // );
    this.color = 'black';
  }
}
