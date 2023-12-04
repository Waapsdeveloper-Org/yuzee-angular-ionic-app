"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryCodePickerComponent = void 0;
var core_1 = require("@angular/core");
var country_codes_1 = require("../../constants/country-codes");
var CountryCodePickerComponent = /** @class */ (function () {
    function CountryCodePickerComponent(modalController) {
        this.modalController = modalController;
        this.countryCodeList = country_codes_1.CountryCodeList.countryCodes;
        this.searchedList = [];
        this.searching = false;
        this.selectedCountryCode = null;
    }
    CountryCodePickerComponent.prototype.ngOnInit = function () { };
    CountryCodePickerComponent.prototype.searchFromArray = function (item) {
        console.log("ITEM :", item);
        var name = item.value;
        if (name.length > 0) {
            this.searching = true;
            this.searchedList = this.countryCodeList.filter(function (x) { return x.name.startsWith(name); });
        }
        else {
            this.searching = false;
        }
    };
    CountryCodePickerComponent.prototype.selectItem = function (countryCode) {
        this.selectedCountryCode = countryCode;
        console.log("SELECTED CODE: ", this.selectedCountryCode);
        this.modalController.dismiss({
            'selected': this.selectedCountryCode
        });
    };
    CountryCodePickerComponent = __decorate([
        core_1.Component({
            selector: 'app-country-code-picker',
            templateUrl: './country-code-picker.component.html',
            styleUrls: ['./country-code-picker.component.scss']
        })
    ], CountryCodePickerComponent);
    return CountryCodePickerComponent;
}());
exports.CountryCodePickerComponent = CountryCodePickerComponent;
