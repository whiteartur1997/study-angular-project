import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]',
})

export class DropdownDirective {

  constructor(private elRef: ElementRef) {}

  @HostBinding('class.open') dropdownIsOpened = false;
  @HostListener('document:click', ['$event']) onClick(event: Event) {
    this.dropdownIsOpened = this.elRef.nativeElement.contains(event.target) ? !this.dropdownIsOpened : false
  }


}
