import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }


  // using Renderer2
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue')
    this.backgroundColor = this.defaultColor;
    }
  // @HostListener('mouseenter') mouseover(eventData: Event) {
  //    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue')

  // }
  // @HostListener('mouseleave') mouseleave(eventData: Event) {
  //    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent')

  // }

  // using @HostBinding

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue')
    // this.backgroundColor = 'blue';
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent')
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }

}
