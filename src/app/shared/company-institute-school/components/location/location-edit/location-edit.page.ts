import {
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CompanyApiService, InstitutionApiService } from "yuzee-shared-lib";
import { ModalController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { GenericSearchableRadioSelectionComponent, LocationAutocompleteComponent } from "src/app/shared";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { SharedService } from "src/app/services/shared.service";
import { ToastService } from "src/services/toast.service";
import { ChangeRequestModalComponent } from "../../change-request-modal/change-request-modal.component";
declare let google;

@Component({
  selector: "app-location-edit",
  templateUrl: "./location-edit.page.html",
  styleUrls: ["./location-edit.page.scss"],
})
export class LocationEditPage extends CcBasePage implements OnInit {
  @ViewChild("map") mapElement: ElementRef;
  @Input() isInstitute;
  @Input() workingHours = [];
  selectedDayId = -1;
  map: any;
  location: any = {};
  selectedDay: string = "Select Day";
  showTo: string = "Public";
  timeTemplate: any = [];
  weekDays: any = [];
  hourTo: string = null;
  hourFrom: string = null;
  dayOfWeek: string = null;
  phoneNumber: string = null;
  emailAddress: string = null;
  dayOff: boolean = false;
  isAddDateTimeDisabled: boolean = true;
  isFromError: boolean = false;
  isToError: boolean = false;
  isDayError: boolean = false;
  lat: any;
  long: any;
  canSubmit: boolean = false;
  nlocation:any;
  ntimeTemplate:any;
  hideDateTime: boolean = false;
  submitted: boolean = false;

  constructor(
    injector: Injector,
    private companyApi: CompanyApiService,
    private popupModal: ModalController,
    private geolocation: Geolocation,
    public shared: SharedService,
    private modalCtrl: ModalController,
    private instituteApiService: InstitutionApiService,
    private toastService: ToastService
  ) {
    super(injector);
  }

  ngOnInit() {
    if (!this.nlocation) {
      this.nlocation = this.shared.companyProfile.locations[0];
    }

    if (!this.ntimeTemplate) {
      this.companyApi
      .getCompanyWorkingHours(this.shared.companyId)
      .then((res: any) => {
        if (res) {
          this.ntimeTemplate = res.data;
        }
      });
    }

    this.location = this.shared.clone(this.nlocation);
    this.timeTemplate = [].concat(this.ntimeTemplate);

    if (this.timeTemplate.length == 0) {
      let obj = {
        open_at: "",
        day_of_week: "",
        close_at: "",
        is_off_day: false,
      };
      this.timeTemplate.push(obj);
    }
    

    this.showHideAddDateTime();
    this.loadMapFromLatLong();
    this.getWeekDays();
    this.enableDisableDateTime();
    this.instituteEnableDisableDateTime();
    this.instituteShowHideAddDateTime();
  }

  mapForVariableWorkingHours(){

    for( let i = 0; i < this.workingHours.length; i++ )
    {
      let iwd = this.weekDays.findIndex(x => x.day_of_week.toLowerCase() == this.workingHours[i].day_of_week.toLowerCase() );

      if(iwd != -1){
        this.weekDays[iwd].placement = i;
        this.weekDays[iwd].selected = true;
      }
    }
  }


  instituteShowHideAddDateTime() {
    if (this.workingHours.length >= 7) {
      this.hideDateTime = true;
    } else {
      this.hideDateTime = false;
    }
  }

  showHideAddDateTime() {
    if (this.timeTemplate.length >= 7) {
      this.hideDateTime = true;
    } else {
      this.hideDateTime = false;
    }
  }

  loadMapFromLatLong() {
    if (this.location.latitude && this.location.longitude) {
      this.lat = this.location.latitude;
      this.long = this.location.longitude;
      setTimeout(() => {
        this.loadMap(this.lat, this.long);
      }, 500);
    } else {
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;
          this.loadMap(this.lat, this.long);
        })
        .catch((error) => {});
    }
  }

  save() {
    this.submitted = true;
    if(this.isInstitute)
    {
      this.instituteEnableDisableDateTime();
      this.instituteApiService.addInstitutionWorkingHours(this.shared.instituteId, this.capitalize(this.workingHours), null)
      .then((res) => {
        if(res) {
          this.shared.workingHoursSubject.next(res);
          this.ccModalService.dismiss();
        }

      }).catch((error) => {
        this.toastService.presentToast(error.message);
      });
    }
    else{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.companyApi.updateWorkingHours(this.shared.companyId,this.capitalize(this.workingHours)).then((res) => {
        if(res) {
          this.shared.workingHoursSubject.next(res);
          this.ccModalService.dismiss();
        }

      }).catch((error) => {
        this.toastService.presentToast(error.message);
      });
    }

    if (!this.isAddDateTimeDisabled) {
      return;
    } else {
      this.timeTemplate = this.timeTemplate.map((x) => {
        let obj = {
          opening_at: "",
          week_day: "",
          closing_at: "",
          is_off_day: false,
          working_hour_id: null
        };
        obj.opening_at = x.open_at;
        obj.closing_at = x.close_at;
        obj.week_day = x.day_of_week;
        obj.is_off_day = x.is_off_day;
        if (x.working_hour_id) {
          obj.working_hour_id = x.working_hour_id;
        }
        return obj;
      });

      /** Required code - to be seen in next sprint (comment date: 29/03/2023) */
      // this.companyApi
      //   .updateCompanyLocationWorkHours(
      //     { companynlocation: this.location, working_hours: this.timeTemplate },
      //     this.shared.companyId
      //   )
      //   .then((res: any) => {
      //     if (res.status == 200) {
      //       this.ccUtilityService.presentToast(res.message);
      //       this.shared.companyDetailsChanged.next();
      //       this.ccModalService.dismiss({ data: true });
      //     }
      //   })
      //   .catch((err) => {
      //     this.ccUtilityService.presentToast("Error");
      //     this.ccModalService.dismiss({ data: false });
      //   });
        /** Required code - to be seen in next sprint */
    }
  }


  capitalize(arr) {
    for (let i = 0; i < arr.length; i++) {
      let days = arr[i].day_of_week;
      arr[i].day_of_week = days.toUpperCase();
    }
    return arr;
  }

  async openLocation() {
    if(this.isInstitute)
    {
      const modal = await this.modalCtrl.create({
        component: ChangeRequestModalComponent,
        showBackdrop: true,
        mode: "ios",
        cssClass: "generic-large-popup-modal generic-modal",
        swipeToClose: true,
        backdropDismiss: true,
        componentProps: {isTellUsHide: true , extraParams:
        {
          heading: 'Warning \n\n\n You are Applying for the Address change \n',
          message:'request \n'+
         ' \n\n !Please email to business support@yuzee.com and please answer the following questions. \n Reason for change \n New address \n Please send us any evidence that you own the new address. ', button: 'Confirm'} },
      });
      return await modal.present();
    }
    else{
    const modal = await this.popupModal.create({
      component: LocationAutocompleteComponent,
      componentProps: {
        location: this.location.address,
      },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data) {
          this.canSubmit = true;
          const nlocation = dataReturned.data;
          this.loadMap(nlocation.latitude, nlocation.longitude);
          this.location.address = nlocation.address;
          this.location.latitude = nlocation.latitude;
          this.location.longitude = nlocation.longitude;
          this.location.city_name = nlocation.City;
          this.location.country_name = nlocation.Country;
          this.location.state_name = nlocation.State;
          this.location.postal_code = nlocation.Postal_code;
        }
      }
    });
    return await modal.present();
  }
}

  getWeekDays() {
    this.companyApi.getWeekDays().then((res: any[]) => {
      this.weekDays = res.map((txt, index) => ({
        day_id: index,
        selected: false,
        placement: -1,
        day_of_week: txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }));
      this.mapForVariableWorkingHours();

    });
  }

  // WORKING HOURS TO
  to(value, index) {
    this.canSubmit = true;
    this.hourTo = value;
    this.enableDisableDateTime();
    this.instituteEnableDisableDateTime();
  }
  // WORKING HOURS FROM
  from(value, index) {
    this.canSubmit = true;
    this.hourFrom = value;
    this.enableDisableDateTime();
    this.instituteEnableDisableDateTime();
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
    };
    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map,
    });
    marker.setMap(this.map);
  }

  selectedDayOfWeek(selected, index) {
    this.workingHours[index].day_of_week = selected;
    this.dayOfWeek = selected;
    this.canSubmit = true;
    this.enableDisableDateTime();
    this.instituteEnableDisableDateTime();
  }

  selectOffday(value, index) {
    this.timeTemplate[index].is_off_day = value;
    this.dayOff = value;
  }

  incrementTimeTemplate() {

    if(this.isInstitute)
    {
      if (this.isAddDateTimeDisabled) {
        this.workingHours.push({
          open_at: "",
          close_at: "",
          day_of_week: "",
          is_off_day: false,
        });
        this.instituteEnableDisableDateTime();
        this.instituteShowHideAddDateTime();
      }
    }

    else {

    if (this.isAddDateTimeDisabled) {
      this.timeTemplate.push({
        open_at: "",
        close_at: "",
        day_of_week: "",
        is_off_day: false,
      });
      this.enableDisableDateTime();
      this.showHideAddDateTime();
    }
  }
  }


  instituteEnableDisableDateTime() {
    if (this.workingHours) {
      const lastElement = this.workingHours.length - 1;
      if (this.workingHours[lastElement]) {
        const isEmpty =
          this.workingHours[lastElement].day_of_week == "" ||
          null ||
          this.workingHours[lastElement].open_at == "" ||
          null ||
          this.workingHours[lastElement].close_at == "" ||
          null
            ? false
            : true;
        if (isEmpty) {
          this.isAddDateTimeDisabled = true;
          return;
        } else {
          this.isAddDateTimeDisabled = false;
        }
      }
    }
  }

  enableDisableDateTime() {
    if (this.timeTemplate) {
      const lastElement = this.timeTemplate.length - 1;
      if (this.timeTemplate[lastElement]) {
        const isEmpty =
          this.timeTemplate[lastElement].day_of_week == "" ||
          null ||
          this.timeTemplate[lastElement].open_at == "" ||
          null ||
          this.timeTemplate[lastElement].close_at == "" ||
          null
            ? false
            : true;
        if (isEmpty) {
          this.isAddDateTimeDisabled = true;
          return;
        } else {
          this.isAddDateTimeDisabled = false;
        }
      }
    }
  }

  getShowClose(i) {
    return i !== 0;
  }

  async presentPopUp(selecteds, index) {

    const indices = this.weekDays.filter( x => x.placement != -1 && x.placement != index ).map( x => x.day_id )
    const selected = this.weekDays.find(x => x.placement != -1 && x.placement == index);

    const res = await this.ccModalService.present(GenericSearchableRadioSelectionComponent, {
      title: "Days of Week",
      data: this.weekDays,
      keyToShow: "day_of_week",
      selected: selected ? selected?.day_of_week : null,
      showSearch: false,
      disableIndexes: indices
    }, 'generic-medium-popup-modal generic-modal generic-model-backdrops');

    if (res.data && res.data.value) {
      this.workingHours[index].day_of_week = res?.data?.value?.day_of_week
      this.selectedDayId = res.data.value.day_id;

      let itemIndex = this.weekDays.findIndex(x => x.day_id == res?.data?.value?.day_id);

      if(itemIndex != -1){

        let item = Object.assign({}, this.weekDays[itemIndex]);

        if(item.placement == -1){

          item.placement = index;
          item.selected = true;
          this.weekDays[itemIndex] = item;

          for(let i = 0; i < this.weekDays.length; i++){

            if(i != itemIndex && this.weekDays[i].placement == index){
              this.weekDays[i].placement = -1;
            }
          }

        }

      }

    }
  }

  async dismiss() {
    if (this.canSubmit) {
      const res = await this.ccUtilityService.showConfirmPopOver();

      if (res) {
        this.ccModalService.dismiss();
      } else {
        return;
      }
    } else {
      this.ccModalService.dismiss();
    }
  }

  removeTimeTemplate(index) {

    this.workingHours.splice(index, 1);
    if(this.isInstitute)
    {
      this.instituteEnableDisableDateTime();
      this.instituteShowHideAddDateTime();
    }
    else{
    this.enableDisableDateTime();
    this.showHideAddDateTime();
  }
  }
}
