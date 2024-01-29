import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  constructor(private el: ElementRef) {
    this.setBorder('#f5f5f5');
    this.setHeight(180);
  }

  @Input('pkmnBorderCard') borderColor: string;

  @HostListener('mouseenter') OnMouseEnter() {
    this.setBorder('#009688')
  }
  @HostListener('mouseleave') OnMouseLeave() {
    this.setBorder(this.borderColor || '#f5f5f5');
  }

  private setBorder(color: string) {
      let border = 'solid 4px ' + color;
      this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number) {
      this.el.nativeElement.style.height = height + 'px';
  }
}
