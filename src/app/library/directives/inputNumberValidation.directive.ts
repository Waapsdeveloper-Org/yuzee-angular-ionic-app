import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[numberValidation]',
})
export class InputNumberValidation {
  invalidChars: any = ['-', '+', 'e'];
  @Input() numberValidation = 0;
  @HostListener('keypress', ['$event'])
  maxNumber(event) {
    if (this.invalidChars.includes(event.key) || event.target.value.length === this.numberValidation) {
        return false
    }
  }
}
