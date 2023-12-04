import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent implements OnInit {

  searcLocation: any;
  searcheList: any;
  showList: boolean = false;
  selectedLocation = [];
  GlobalSearchedFilter: any = {
    location: 0,
    company: 0,
    institution: 0,
    campus: 0,
    type: 0,
    worldranking: 0,
    course: 0,
    faculty: 0,
    duration: 0,
    deliverymethod: 0,
    funding: 0,
    industry: 0,
    category: 0,
    jobtype: 0,
    salary: 0,
    schedule: 0,
    studylevel: 0,
    deadline: 0,
    country: 0,
    validity: 0,
    date: 0,
    eventType: 0,
    postedby: 0,
    authorindustry: 0
  }

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  getItems($event) {
    this.searcheList = [
      {
        shortAddress: 'Fed Square • Melbourne, Australia',
        fullAdress: 'Swanston St & Flinders St, Melbourne VIC 3000, Australia'
      }, {
        shortAddress: 'Fed Square • Melbourne, Australia',
        fullAdress: 'Swanston St & Flinders St, Melbourne VIC 3000, Australia'
      }, {
        shortAddress: 'Fed Square • Melbourne, Australia',
        fullAdress: 'Swanston St & Flinders St, Melbourne VIC 3000, Australia'
      }, {
        shortAddress: 'Jalan Sultan Abdul Jalil',
        fullAdress: 'No 154295, Wisma SSI, Jalan Sultan Abdul Jalil, Green'
      }, {
        shortAddress: 'Fed Square • Melbourne, Australia',
        fullAdress: 'Swanston St & Flinders St, Melbourne VIC 3000, Australia'
      }, {
        shortAddress: 'Jalan Sultan Abdul Jalil',
        fullAdress: 'No 154295, Wisma SSI, Jalan Sultan Abdul Jalil, Green'
      }
    ]
      this.showList = true;
  }

  select(location){
    this.GlobalSearchedFilter = localStorage.getItem("Filters");
    this.GlobalSearchedFilter = JSON.parse(this.GlobalSearchedFilter);
    if(this.GlobalSearchedFilter.location == 0){
      console.log(location);
      this.selectedLocation.push(location);
      console.log(this.selectedLocation.length);
      this.GlobalSearchedFilter.location = this.selectedLocation.length;
      localStorage.setItem("Filters",JSON.stringify(this.GlobalSearchedFilter));
      localStorage.setItem('Locations',JSON.stringify(this.selectedLocation))
      this.modalCtrl.dismiss({
        dismissvalue: this.GlobalSearchedFilter
      });
    }else{
      var seletedData = localStorage.getItem("Locations")
      this.selectedLocation = JSON.parse(seletedData);
    }
  }

  goBack(){
    this.modalCtrl.dismiss({
      dismissvalue: ''
    });
  }


}
