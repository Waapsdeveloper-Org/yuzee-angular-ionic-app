import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryCodeList } from 'src/constants/country-codes';

@Component({
  selector: 'app-phone-code-picker',
  templateUrl: './phone-code-picker.component.html',
  styleUrls: ['./phone-code-picker.component.scss'],
})
export class PhoneCodePickerComponent implements OnInit {

  countryCodes: any[] = [];
  searchTerm: string = '';
  phoneCode;
  showPhoneCode = '';
  
  showNationalities = '';
  constructor(private modalCtrl: ModalController,
    private navParams: NavParams) {}

  ngOnInit() {
    this.showPhoneCode = this.navParams.get("showPhoneCode");
    this.showNationalities = this.navParams.get("showNationalities");

    this.countryCodes = CountryCodeList.countryCodes;
    this.countryCodes = this.countryCodes.map(v => ({ ...v, isActive: false }));
  }
  selectedCode(country){
    this.modalCtrl.dismiss({value: country});
  }

  onsearch() {
    const term = this.searchTerm;
    this.countryCodes = CountryCodeList.countryCodes.filter(x => x.name.toLowerCase().startsWith(term.toLowerCase()) ?? x);
  }

  customSearchFn(term: string, item: any) {
    return item.name.toLowerCase().startsWith(term.toLowerCase());
  }

  goBack() {
    this.modalCtrl.dismiss();
  }
  selectedNationalities(item){
    if (!item.isActive) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  }
  apply(){
    this.modalCtrl.dismiss(this.countryCodes);
  }
}
