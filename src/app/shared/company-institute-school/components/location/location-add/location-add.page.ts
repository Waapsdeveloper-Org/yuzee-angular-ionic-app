import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
declare let google;
import { Router } from '@angular/router';
import { ModalController } from "@ionic/angular";
import {SharedService} from '../../../../../../app/services/shared.service';
import { LocationAutocompleteComponent } from "src/app/shared";

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.page.html',
  styleUrls: ['./location-add.page.scss'],
})
export class LocationAddPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any=33.5651107;
  long: any=73.0169135;
  GoogleAutocomplete: any;
  locationRetObj: any = {};
  autocompleteItems: any[] = [];
  location: any;
  searchTxt: any;
  
  
  form: any = {
    city: "",
    state: "",
    country: "",
  };
  constructor(
    private router: Router,
    private shared: SharedService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    setTimeout(()=>{
      this.loadMap(this.lat,this.long);
    },3000);
  }

  goBack() {
    this.router.navigate(['company-profile/location-edit'])
  }

  save() {
      this.shared.locationObject.city_name = this.form.city;
      this.shared.locationObject.country_name = this.form.country;
      this.shared.locationObject.state_name = this.form.state;
      this.shared.locationObject.latitude = this.lat;
      this.shared.locationObject.longitude = this.long;
      let city: string = this.form.city;
      let country: string = this.form.country;
      this.shared.locationObject.address = `${city} , ${country}`;
  }

  loadMap(lat,lng){
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false,
    }
    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map
    });
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    marker.setMap(this.map);
  }

  async openMapAutoComplete() {
    const modal = await this.modalCtrl.create({component: LocationAutocompleteComponent,
      componentProps:{}
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
            console.log(dataReturned.data)
            this.lat = dataReturned.data.latitude;
            this.long = dataReturned.data.longitude;
          this.loadMap(dataReturned.data.latitude,dataReturned.data.longitude);
          this.locationRetObj = dataReturned.data
          this.form.country = this.locationRetObj.Country;
          this.form.city = this.locationRetObj.City;
          this.form.state = this.locationRetObj.State;
          // this.addressContObj.address = this.locationRetObj.Country+','+this.locationRetObj.City
          // this.addressContObj.latitute = this.locationRetObj.latitude;
          // this.addressContObj.longitude = this.locationRetObj.longitude;
          // console.log("openMapAutoComplete Obj>> ",this.addressContObj)
          // this.getGeoencoder(this.locationRetObj.latitude,this.locationRetObj.longitude)
        }
      }
    });
    return await modal.present();
  }

  getAddress(data) {
    console.log(data);
    this.autocompleteItems = [];
    this.searchTxt = data.description;
    let geocoder = new google.maps.Geocoder();
    console.log(geocoder);
    geocoder.geocode({ address: data.terms[0].value }, (results, status) => {
      console.log("results====", results);
      results[0].address_components.forEach((res) => {
        console.log(res);
        if (res.types[0] == "locality") {
          this.form.city = res.long_name;
        } else if (res.types[0] == "country") {
          this.form.state = res.long_name;
        } else if (res.types[0] == "administrative_area_level_1") {
          this.form.country = res.long_name;
        }
        // console.log(this.form)
      });
    });
  }

}
