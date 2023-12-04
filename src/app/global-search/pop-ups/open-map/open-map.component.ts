import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { courseListArray, searchCourseFilterArray } from 'src/app/app.constants';
import { CcModalService } from 'src/app/services/cc-modal.service';
import { GlobalSearchSectionMoreOptionComponent } from '../..';
import { CourseInfoPopupComponent } from 'src/app/shared';
declare var google;

@Component({
  selector: 'app-open-map',
  templateUrl: './open-map.component.html',
  styleUrls: ['./open-map.component.scss'],
})
export class OpenMapComponent implements OnInit {

  slideOpts = {};
  map: any;
  lat: any = 0;
  long: any = 0;
  courseList = courseListArray;
  searchCourseFilter = searchCourseFilterArray;
  constructor(public modalCtrl: ModalController,
    private ccModalService: CcModalService) { }

  ngOnInit() {
    this.lat = -37.840935;
    this.long = 144.946457;
    setTimeout(() => {
      this.slideOpts = {
        initialSlide: 0,
        slidesPerView: this.checkScreen(),
        speed: 400,
      };
    }, 1000);
    this.loadMap(this.lat, this.long);
  }

  goBack(){
    this.modalCtrl.dismiss({
      dismissvalue: ''
    });
  }
  loadMap(lat, lng) {
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
      fullscreenControl: false
    }
   
  }
  checkScreen(){
    if(window.innerWidth>=750){
      return 2.05;
    }else{
      return 1.05;
    }
  }
  moreOptions() {
    this.ccModalService.present(GlobalSearchSectionMoreOptionComponent, {}, "generic-sm-popup-modal generic-modal generic-model-backdrops", "", "ios");
  }
  openCourseInfo() {
    this.ccModalService.present(CourseInfoPopupComponent, {}, "modal-full-screen-view", "right", "md");
  }
}
