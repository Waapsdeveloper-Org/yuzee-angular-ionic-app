import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.scss'],
})
export class CountryFilterComponent implements OnInit {

  countryList : any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.countryList = [
      {
        countryname: 'Netherlands',
        isselected: false,
      },
      {
        countryname: 'Malaysia',
        isselected: false,
      },
      {
        countryname: 'United States of America',
        isselected: false,
      },
      {
        countryname: 'China',
        isselected: true,
      },
      {
        countryname: 'Japan',
        isselected: false,
      },
      {
        countryname: 'United Kingdom',
        isselected: false,
      },
      {
        countryname: 'Australia',
        isselected: true,
      },
      {
        countryname: 'Netherlands',
        isselected: true,
      }
    ]
  }

  back(){
    this.modalCtrl.dismiss();
  }

}
