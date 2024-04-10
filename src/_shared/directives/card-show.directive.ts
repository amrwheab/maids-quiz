import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardShow]'
})
export class CardShowDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.4s ease';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transform = 'translateY(-10px)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'translateY(0)';
  }

}
