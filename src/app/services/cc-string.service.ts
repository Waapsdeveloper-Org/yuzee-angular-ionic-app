import { Injectable } from "@angular/core";
import { CONTACTS_LIST_ARRAY } from "../app.constants";

@Injectable({
  providedIn: "root",
})
export class CcStringService {
  constructor() {}

  getOnlyDigits(value): string {
    const numberString = value.toString();
    const numberVal = numberString.replace(/[^\d]/g, "");
    return numberVal;
  }

  getReducedNumber(value: number, length: number): string {
    const numbersOnly = this.getOnlyDigits(value);
    const reducedString = numbersOnly.substring(0, length);
    return reducedString;
  }

  capitalizeEachFirst(str: string) {
    if (!str) {
      return "";
    }
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  isValidEmail(email: string) {
    const emailPattern =
      /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
    return !!emailPattern.test(email);
  }

  isValidUrl(urlString: string) {
    const urlPattern =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,3}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,3}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,3}|www\.[a-zA-Z0-9]+\.[^\s]{2,3})+$/;
    return !!urlPattern.test(urlString);
  }

  isYuzeeValidUrl(urlString: string) {
    const urlPattern = new RegExp("^[a-zA-Z0-9-]+$", "i");
    return !!urlPattern.test(urlString);
  }

  removeEmojis(str: string) {
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
  }

  translateNameIntoIconContactArray(name){

    let item = CONTACTS_LIST_ARRAY.find( x => x.contact_type == name);
    if(item){
      return item.icon
    }

    return name;
  }

  getFormattedUnderscoreValue(value) {
    let v = String(value).split(" ").join("_");
    const str = this.capitalizeEachFirst(v);
    return str;
  }

  getReverseFormattedUnderscoreValue(value) {
    let v = String(value).split("_").join(" ");
    const str = this.capitalizeEachFirst(v);
    return str;
  }

}
