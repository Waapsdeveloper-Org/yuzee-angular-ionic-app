import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scholarship-adf',
  templateUrl: './scholarship-adf.component.html',
  styleUrls: ['./scholarship-adf.component.scss'],
})
export class ScholarshipAdfComponent implements OnInit {

  @Input() searchData
  @Output() applyFiltersValue = new EventEmitter<string>();
  
  SearchKeyword : any;
  CountryArray : any = []
  CityArray: any = [];
  applyObj: any = {};
  countFilterValue: number = 1;
  LevelSendSelected: any = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.searchData.filters.country_name){
      this.searchData.filters.country_name.forEach(element => {
        this.CountryArray.push({name: element,isActive:true})
      });
    }
    if(this.searchData.filters.level_Code){
      this.searchData.filters.level_Code.forEach(element => {
        this.LevelSendSelected.push({name: element,isActive:true})
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

  removeLevelsFilter(lvls){
    let index = this.LevelSendSelected.indexOf(lvls);
    if(index > -1){
        this.LevelSendSelected.splice(index, 1);
    }
  }

  async openLevels(){
    const modal = await  this.modalCtrl.create({component: 'LevelListMultipleComponent',
        componentProps:{'FiltersLevels': this.LevelSendSelected}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
          this.LevelSendSelected = []
          this.LevelSendSelected = dataReturned.data
          this.searchData.filters.level_Code = Array.prototype.map.call(this.LevelSendSelected, levels => levels.code)
        }
      }
    });
    return await modal.present();
  }
  submitApply(){
    console.log(this.searchData)
    this.applyFiltersValue.emit(this.searchData)
    this.applyObj.searchData = this.searchData
    this.applyObj.CountryArray = this.CountryArray
    this.applyObj.countFilterValue = this.countFilterValue
    this.modalCtrl.dismiss(this.applyObj)
  }

}
