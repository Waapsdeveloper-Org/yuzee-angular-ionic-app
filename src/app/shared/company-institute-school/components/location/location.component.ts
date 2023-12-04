import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Injector,
  Input,
} from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { InstitutionApiService } from "yuzee-shared-lib";
import { LocationEditPage } from "./location-edit/location-edit.page";
import { LocationObjInterface } from "src/app/library/interfaces/shared-interfaces.interface";
import { LocationService } from "src/app/services/location.service";
import { workingDaysnHours } from "src/app/app.constants";
declare let google;

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent extends CcBasePage implements OnInit {
  @ViewChild("map") mapElement: ElementRef;
  @Input("isInstitute") isInstitute;
  @Input() hasAccessUpdate;
  instituteRes;
  map: any;
  workingHours: any[] = [];
  instituteWorkingHours: any;
  locationObj: LocationObjInterface = {
    address: '',
    latitude: 0.0,
    longitude: 0.0
  };
  daysMap = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
  };

  constructor(
    injector: Injector,
    private institutionApiService: InstitutionApiService,
    public locations: LocationService
  ) {

    super(injector);
  }

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {

    if (this.isInstitute) {

      this.shared.workingHoursSubject.subscribe(() => {
      this.institutionApiService.getInstitutionWorkingHours(this.shared.instituteId).then((res) => {
        this.instituteWorkingHours = res;
      });

    });
      this.shared.basicInfo.subscribe((res) => {
        this.instituteRes = res;
      if (this.instituteRes) {
        this.locationObj.address = this.instituteRes.address;
        this.locationObj.latitude = this.instituteRes.latitude;
        this.locationObj.longitude =  this.instituteRes.longitude;
          this.loadMap(this.locationObj.latitude, this.locationObj.longitude);

        // set working hours
        let timings = this.instituteRes.institute_timings;
        if (timings?.length > 0) {
          this.workingHours = workingDaysnHours.map((item) => {

            let findIndex = timings.findIndex(x => x.day_of_week.toLowerCase() == item.day_of_week.toLowerCase());
            item.hidden = findIndex == -1;
            if (findIndex != -1) {
              item.close_at = timings[findIndex].close_at;
              item.open_at = timings[findIndex].open_at;
              item.is_off_day = timings[findIndex].is_off_day;
            }
            return item;
          });
        }

      }  });

    } else {
      this.shared.companyWorkingHoursFetched.subscribe((res: any) => {
        if (res) {
          this.instituteWorkingHours = res.data;

          this.instituteWorkingHours.sort(
            (a, b) => this.daysMap[a.day_of_week] - this.daysMap[b.day_of_week]
          );
          this.workingHours = workingDaysnHours.map((item) => {

            let findIndex = this.instituteWorkingHours.findIndex(x => x.day_of_week.toLowerCase() == item.day_of_week.toLowerCase());
            item.hidden = findIndex == -1;
            if (findIndex != -1) {
              item.close_at = this.instituteWorkingHours[findIndex].close_at;
              item.open_at = this.instituteWorkingHours[findIndex].open_at;
              item.is_off_day = this.instituteWorkingHours[findIndex].is_off_day;
            }
            return item;
          })
        }
      });

      this.shared.companyDetailsFetched.subscribe((res) => {
        this.locationObj = res.location;
        this.loadMap(this.locationObj.latitude, this.locationObj.longitude);
      });
    }

  }

  async editLocation() {
    await this.ccModalService.present(LocationEditPage, {
      nlocation: this.locationObj,
      ntimeTemplate: this.workingHours ?? [],
      isInstitute: this.isInstitute,
      workingHours: this.instituteWorkingHours ?? []
    });
  }
  loadMap(lat, long) {
    let latLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: latLng,
      zoom: this.isInstitute ? 10 : 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      scaleControl: false,
      attributionControl: false,
      fullscreenControl: false,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map,
    });
    marker.setMap(this.map);
  }
}
