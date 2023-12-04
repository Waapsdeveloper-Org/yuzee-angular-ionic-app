import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-advance-filter',
  templateUrl: './advance-filter.component.html',
  styleUrls: ['./advance-filter.component.scss'],
})
export class AdvanceFilterComponent implements OnInit {
  FiltersViewShow: any;
  searchFilterObj: any = {
    filters : {},
    rangeFilter : {},
    priceFilter : {}
  };
  selectedTabValue: any;
  whichPageView: any;

  constructor(public modalCtrl: ModalController,public navParams: NavParams) { }

  ngOnInit() {
    if(this.navParams.get("advanceFilter")){
      this.searchFilterObj = this.navParams.get("advanceFilter")
      console.log(this.searchFilterObj)
    }
    if(this.navParams.get("selectedTab")){
      this.selectedTabValue = this.navParams.get("selectedTab")
      console.log(this.selectedTabValue)
      this.FiltersViewShow = this.selectedTabValue
    }
    if(this.navParams.get("whichPage")){
      this.whichPageView = this.navParams.get("whichPage")
    }
  }

  public ShowDiv(value) {
    console.log(value)
    this.FiltersViewShow = value
    this.searchFilterObj.filters = {}
    this.searchFilterObj.rangeFilter =  {}
    this.searchFilterObj.priceFilter = {}
  }

  readOutputValueEmitted(blueprintData){
    console.log(blueprintData)
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

}
