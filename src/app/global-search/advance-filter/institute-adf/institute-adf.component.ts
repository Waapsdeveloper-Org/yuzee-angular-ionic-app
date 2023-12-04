import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-institute-adf',
  templateUrl: './institute-adf.component.html',
  styleUrls: ['./institute-adf.component.scss'],
})
export class InstituteAdfComponent implements OnInit {

  @Input() searchData
  @Output() applyFiltersValue = new EventEmitter<string>();
  
  SearchKeyword : any;
  CountryArray : any = []
  CityArray: any = [];
  applyObj: any = {};
  countFilterValue: number = 1;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.searchData)
    if(this.searchData.filters.country_name){
      this.searchData.filters.country_name.forEach(element => {
        this.CountryArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.city_name){
      this.searchData.filters.city_name.forEach(element => {
        this.CityArray.push({name: element,isActive:true})
      });
    }
  }

  removeCountryFilter(facul){
    let index = this.CountryArray.indexOf(facul);
    if(index > -1){
        this.CountryArray.splice(index, 1);
    }
  }

  async openCountryModal() {
    const modal = await this.modalCtrl.create({component: 'CountrySearchMultipleComponent',
      componentProps:{'Countries': this.CountryArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned)
        if(dataReturned.data != undefined){
          this.CountryArray = []
          this.CountryArray = dataReturned.data
          this.searchData.filters.country_name = Array.prototype.map.call(this.CountryArray, country => country.name)
          console.log(this.searchData)
          var keys = Object.keys(this.searchData.filters);
          this.countFilterValue = keys.length + 1;
          console.log(this.countFilterValue)
        }
      }
    });
    return await modal.present();
  }

  async openCityModal() {
    const modal = await this.modalCtrl.create({component: 'CitySearchMultipleComponent',
      componentProps:{'Cities': this.CityArray}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log(dataReturned)
        if(dataReturned.data != undefined){
          this.CityArray = dataReturned.data
          console.log(this.CityArray)
          this.searchData.filters.city_name = Array.prototype.map.call(this.CityArray, city => city.name)
          console.log(this.searchData)
          var keys = Object.keys(this.searchData.filters);
          this.countFilterValue = keys.length + 1;
          console.log(this.countFilterValue)
        }
      }
    });
    return await modal.present();
  }

  removeCityFilter(city){
    let index = this.CityArray.indexOf(city);
    if(index > -1){
        this.CityArray.splice(index, 1);
    }
  }

  submitApply(){
    console.log(this.searchData)
    this.applyFiltersValue.emit(this.searchData)
    this.applyObj.searchData = this.searchData
    this.applyObj.CountryArray = this.CountryArray
    this.applyObj.CityArray = this.CityArray
    this.applyObj.countFilterValue = this.countFilterValue
    this.applyObj.type = 'institute'
    this.applyObj.indexValue = 'yuzee_dev_institute'
    this.applyObj.searchString = this.searchData.searchString
    this.modalCtrl.dismiss(this.applyObj)
  }

}
