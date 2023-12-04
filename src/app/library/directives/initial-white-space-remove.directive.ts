import { Directive, HostListener, ElementRef, Input } from "@angular/core";
import * as _ from "lodash";

@Directive({
  selector: "[whiteSpaceRestriction]",
})
export class WhiteSpaceRestrictionDirective {
  regexStr = "^[a-zA-Z0-9_ !@#$%^&*()_+{}:[]:;?><,./|]*$";
  @Input() islink: boolean = false;
  @Input() isemoji: boolean = false;

  _isUrl: boolean = false;
  @Input()
  public get isUrl(): boolean {
    return this._isUrl;
  }
  public set isUrl(value: boolean) {
    this._isUrl = value;
    if (value == true) {
      this.regexStr = "^[a-zA-Z0-9._:/?-%]*$";
    }
  }
  _isPhone: boolean = false;
  @Input()
  public get isPhone(): boolean {
    return this._isPhone;
  }
  public set isPhone(value: boolean) {
    this._isPhone = value;
    if (value == true) {
      this.regexStr = "^[0-9-]*$";
    }
  }

  constructor(private el: ElementRef) {}

  @HostListener("beforeinput", ["$event"])
  onBeforeInput(event): void {
    if (event.inputType == "deleteContentBackward") {
      return;
    }
    if (event.srcElement.selectionStart === 0 && event.data === " ") {
      event.preventDefault();
    }

    if (!RegExp(this.regexStr).test(event.data)) {
      event.preventDefault();
    }

    if (this.isemoji) {
      event.srcElement.value = event.srcElement.value.replace(
        /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        ""
      );
    }

    event.srcElement.value = event.srcElement.value.replace(/\s+/g, " ");

    if (this.isPhone) {
      event.srcElement.value = event.srcElement.value.replace(/-{2,}/g, "-");

      if (/^0*$/.test(event.srcElement.value)) {
        if (event.srcElement.value.length > 1) {
          event.srcElement.value = event.srcElement.value.replace(/0/g, "-");
        }
      }
    }
  }
  validateFields(event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value
        .replace(/[^A-Za-z ]/g, "")
        .replace(/\s/g, "")
        .replace(/\s+/g, " ");
      event.preventDefault();
    }, 100);
  }
}
