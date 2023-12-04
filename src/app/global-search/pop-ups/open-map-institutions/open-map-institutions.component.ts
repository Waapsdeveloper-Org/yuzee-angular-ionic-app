/* eslint-disable no-var */
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { searchInstitutionFilterArray } from "src/app/app.constants";
import { CcModalService } from "src/app/services/cc-modal.service";
import { NgrxService } from "src/app/services/store/ngrx.service";
// eslint-disable-next-line max-len
import { SearchedInstitutionRelatedCoursesComponent } from "../../categories-components/searched-institution/searched-institution-related-courses/searched-institution-related-courses.component";

declare var google;

@Component({
  selector: "app-open-map-institutions",
  templateUrl: "./open-map-institutions.component.html",
  styleUrls: ["./open-map-institutions.component.scss"],
})
export class OpenMapInstitutionsComponent implements OnInit, AfterViewInit {
  @Input("institutionDataArray") institutionDataArray = []; // institutionDataArray;
  @ViewChild("map", { static: false }) mapElement: ElementRef;
  @ViewChild("slides") slides: IonSlides;

  slideOpts = {};
  map: any;
  lat: any = 30.3753;
  long: any = 69.3451;
  searchInstitutionFilter = searchInstitutionFilterArray;
  showSlides = false;

  markers = [];

  constructor(public modals: CcModalService, public ngrx: NgrxService) {
    this.ngrx.subscribe(
      "global-search-institution",
      this.updateList.bind(this)
    );
  }
  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.slides.slideTo(0);
    }, 500);
  }

  btnClick() {}
  ngOnInit() {
    this.lat = -37.840935;
    this.long = 144.946457;

    setTimeout(() => {
      this.loadMap(this.lat, this.long);
    }, 1000);
  }
  updateList(data) {
    this.institutionDataArray = data;
    this.sliderSlideBehav();
    google.maps.Map.prototype.clearMarkers = function() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    };

    for (var i = 0; i < this.institutionDataArray.length; i++) {
      let obj = this.institutionDataArray[i];

      let center = {
        lat: parseFloat(obj.latitude),
        lng: parseFloat(obj.longitude),
      };
      let marker = new google.maps.Marker({
        map: this.map,
        position: center,
        icon: "assets/imgs/googlemaps/marker.png",
      });
      marker.setMap(this.map);
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(center);
      this.map.fitBounds(bounds);
      this.markers.push(marker);
    }
  }
  openDetails(item) {
    this.modals.present(SearchedInstitutionRelatedCoursesComponent, { item });
  }

  initializeMap() {
    this.loadMap(33.6844, 73.0479);
  }

  setL(g) {
    let obj = Object.assign({}, g);
    if (obj.latitude && obj.longitude) {
      let center = {
        lat: parseFloat(obj.latitude),
        lng: parseFloat(obj.longitude),
      };

      this.markers.push(center);

      this.addMarkersToMap(obj);
    }
  }

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false,
      fullscreenControl: false,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); // Required during map implementation
  }
  checkScreen() {
    if (window.innerWidth >= 750) {
      return 2.2;
    } else {
      return 1.05;
    }
  }

  addMarkersToMap(origin) {
    let center = {
      lat: parseFloat(origin.latitude),
      lng: parseFloat(origin.longitude),
    };
    const marker = new google.maps.Marker({
      map: this.map,
      position: center,
      icon: "assets/imgs/googlemaps/marker.png",
    });

    marker.setPosition(center);

    var lat = parseFloat(origin.latitude).toFixed(6);
    var lng = parseFloat(origin.longitude).toFixed(6);
    marker.setMap(this.map);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(center);
    this.map.fitBounds(bounds);
  }
  async ionSlideTransitionEnd($event) {
    let index = $event;

    let activeSlideIndex = await this.slides.getActiveIndex();
    // get index element of array
    let item = this.institutionDataArray[activeSlideIndex];
    if (item) {
      this.setL(item);
    }
  }
  slideEnds($event) {
    this.ngrx.publish("global-search-institute-slides-end", {});
  }
  sliderSlideBehav() {
    setTimeout(() => {
      this.slideOpts = {
        initialSlide: 0,
        slidesPerView: this.checkScreen(),
        speed: 400,
      };
    } , 1000);
  }
}
