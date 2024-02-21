import {
  Directive,
  HostListener,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appForceUppercase]',
})
export class UppercaseDirective implements AfterViewInit {
  constructor(private ref: ElementRef) {}

  ngAfterViewInit() {
    this.ref.nativeElement.value = this.ref.nativeElement.value.toUpperCase();
  }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    this.ref.nativeElement.value = this.ref.nativeElement.value.toUpperCase();
  }
}
