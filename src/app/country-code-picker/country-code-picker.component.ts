import { Component, OnInit } from '@angular/core';
import { CountryCodeList} from '../../constants/country-codes';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-country-code-picker',
  templateUrl: './country-code-picker.component.html',
  styleUrls: ['./country-code-picker.component.scss'],
})
export class CountryCodePickerComponent implements OnInit {

  countryCodeList: any[] = CountryCodeList.countryCodes;
  searchedList: any[] = [];
  searching: boolean = false;
  selectedCountryCode: string = null;
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  searchFromArray(item:any){
    console.log("ITEM :", item);
    let name:string = item.value;

    if(name.length > 0) {
      this.searching = true;
      this.searchedList  = this.countryCodeList.filter(x=> x.name.startsWith(name));
      console.log('Searched List: ', this.searchedList);
    } else {
      this.searching = false;
    }


  }

  selectItem(countryCode){
    this.selectedCountryCode  = countryCode;
    console.log("SELECTED CODE: ", this.selectedCountryCode);
    this.modalController.dismiss({
      'selected': this.selectedCountryCode
    });
  }




}
