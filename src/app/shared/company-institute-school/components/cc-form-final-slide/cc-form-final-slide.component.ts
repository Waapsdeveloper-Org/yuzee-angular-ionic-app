import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Injector,
  Input,
} from "@angular/core";
import { CompanyApiService, InstitutionApiService } from "yuzee-shared-lib";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
declare let google;
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { v1 as uuidv1 } from 'uuid';
import { CountryCodePickerComponent } from "src/app/country-code-picker/country-code-picker.component";
import { SharedService } from "src/app/services/shared.service";
import { GenericSearchableRadioSelectionComponent, LocationAutocompleteComponent } from "src/app/shared";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { ToastService } from "src/services/toast.service";


@Component({
  selector: "app-cc-form-final-slide",
  templateUrl: "./cc-form-final-slide.component.html",
  styleUrls: ["./cc-form-final-slide.component.scss"],
})
export class CcFormFinalSlideComponent extends CcBasePage implements OnInit {

  @ViewChild("map") mapElement: ElementRef;
  @Input() isInstitute;

  keyboardOpened = false;
  countryCode: string = null;
  countryFlag: string = null;

  map: any;
  searchEmpty = true;
  checked = -1;
  modifiedCompanyType;
  submitted = false;

  timeTemplate: {
    day_of_week: string;
    is_off_day: boolean;
    open_at: string;
    close_at: string;
    name: string;
  }[] = [
      {
        open_at: "",
        close_at: "",
        day_of_week: "",
        is_off_day: false,
        name: null
      },
    ];

  instituteTiming: any = [
    {
      open_at: "",
      close_at: "",
      day_of_week: "",
      is_off_day: false,
    },
  ];

  indices;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  lat: any = 0;
  long: any = 0;
  autocompleteItems: any[] = [];
  location: any;
  searchTxt: any;
  GoogleAutocomplete: any;
  locationRetObj: any = {};
  weekDays: any = [];
  selectedDayId = -1;

  form: any = {
    city: "",
    state: "",
    country: "",
    postal_code: ""
  };
  hourTo: string = null;
  hourFrom: string = null;
  dayOfWeek: string = null;
  phoneNumber: string = null;
  emailAddress: string = null;
  dayOff = false;
  minTimeValue: any;
  isAddDateTimeDisabled = true;
  isReadOnly = false;
  postalCode: string = null;

  constructor(
    injector: Injector,
    private api: CompanyApiService,
    private instituteApiService: InstitutionApiService,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    private serviceShared: SharedService,
    public modalCtrl: ModalController,
    private geolocation: Geolocation,
    private toastService: ToastService
  ) {
    super(injector);
    window.addEventListener("ionKeyboardDidShow", (ev) => {
      this.keyboardOpened = true;
    });
    window.addEventListener("ionKeyboardDidHide", () => {
      this.keyboardOpened = false;
    });

  }

  ngOnInit() {
    this.getWeekDays();
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      })
      .catch((error) => {});
  }

  isFilled = (currentValue) => currentValue !== null && currentValue !== "";

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Error",
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  async openLocation() {
    const modal = await this.modalCtrl.create({
      component: LocationAutocompleteComponent,
      componentProps: {
        location: this.locationRetObj.address,
      },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data) {
          //  Required Comment
          // this.loadMap(dataReturned.data.latitude, dataReturned.data.longitude);
          this.long = dataReturned.data.longitude;
          this.lat =  dataReturned.data.latitude;
          this.locationRetObj = dataReturned.data;
          this.form.country = this.locationRetObj.Country;
          this.form.city = this.locationRetObj.City;
          this.form.state = this.locationRetObj.State;
          this.form.postal_code = this.locationRetObj.Postal_code;

          if (!this.isInstitute) {
            this.performAddressValidations();
          }
          else {
            this.performAddressInstituteValidation();
          }
        }
      }
    });
    return await modal.present();
  }

  getAddress(data) {
    this.autocompleteItems = [];
    this.searchTxt = data.description;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: data.terms[0].value }, (results, status) => {
      results[0].address_components.forEach((res) => {
        if (res.types[0] == "locality") {
          this.form.city = res.long_name;
        } else if (res.types[0] == "country") {
          this.form.state = res.long_name;
        } else if (res.types[0] == "administrative_area_level_1") {
          this.form.country = res.long_name;
        }
      });
    });
  }

  getWeekDays() {
    this.api.getWeekDays().then((res: any[]) => {
      this.weekDays = res.map((txt, index) => ({
        day_id: index,
        selected: false,
        placement: -1,
        day_of_week: txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }));
    });
  }

  async saveInstitute() {

    this.instituteTiming = this.capitalize(this.instituteTiming);

    const validationRes = await this.performAddressInstituteValidation();
    if (validationRes) {
      this.serviceShared.createInstitution[0].address =
        this.locationRetObj.address;
      this.serviceShared.createInstitution[0].postal_code =
        this.form.postal_code;
      this.serviceShared.createInstitution[0].institute_timings =
        this.instituteTiming;
    }
    if (!validationRes) {
      return;
    }
    this.instituteApiService.addInstitution(this.serviceShared.createInstitution)
      .then((data) => {
        const x = JSON.parse(JSON.stringify(data));

        if (x.status == 200) {
          this.presentToast(x.message);
          this.instituteApiService.addInstitutionWorkingHours(x.data[0].institute_id, this.capitalize(this.instituteTiming), null)
            .then((res) => { });

          this.serviceShared.instituteId = x.data[0].institute_id;
          this.serviceShared.createInstitution[0].readable_id = uuidv1();
          const obj = {
            fileUpload: this.serviceShared.createInstitution[0].logo_url,
            entity_type: "INSTITUTE",
            entity_sub_type: "LOGO",
            entity_id: x.data[0].institute_id,
          };
          this.shared.uploadEntityType(obj).then((res) => {});
          this.router.navigateByUrl("institution-profile/about");
        }
        else {
          this.toastService.presentToast("Failed to save Institute");
        }
      })
      .catch((err) => {
        if (err.error) {
          this.ccUtilityService.presentToast(err.error.message);
        }
      });
  }

  // CALLING POST API
  async postData() {
    this.submitted = true;
    const validationRes = await this.performAddressValidations();
    if (validationRes) {
      this.serviceShared.createCompany.location.address =
        this.locationRetObj.address;
      this.serviceShared.createCompany.location.contact_working_hours =
        this.timeTemplate;
    }
    if (!validationRes) {
      return;
    }

    this.api
      .postCompanyDetails(this.serviceShared.createCompany)
      .then((res: any) => {
        const x = JSON.parse(JSON.stringify(res));
        if (x.status == 200) {

          const cid = x?.data?.company_id;
          if(cid){
            localStorage.setItem("company_id", String(cid) )
          }

          this.presentToast(x.message);
          this.api.updateWorkingHours(x.data.company_id, this.timeTemplate)
            .then((res_n343) => {

            });
          const contact_detail = [
            {
              contact_type: "WEBSITE",
              value: this.shared.createCompany.websiteUrl,
              privacy_level: "PUBLIC",
            },
          ];
          this.api.postCompanyContactDetails(x.data.company_id, contact_detail)
            .then((res_n344: any) => {

            });

          const obj = {
            fileUpload: this.serviceShared.createCompany.profilePhoto,
            entity_type: "COMPANY",
            entity_sub_type: "LOGO",
            entity_id: x.data.company_id,
          };

          this.shared.uploadEntityType(obj).then((res_n345) => {

          });

          this.serviceShared.publishCompanyCreated(true);
          localStorage.setItem("company_id", String(x.data.company_id));
          this.serviceShared.companyId = x.data.company_id;
          this.router.navigate(["company-profile"]);
        } else {
          this.presentAlert(x.message);
          this.serviceShared.publishCompanyCreated(false);
        }
      })
      .catch((err) => {
        if (err.error) {
          this.ccUtilityService.presentToast(err.error.message);
        }
      });
  }

  performAddressValidations() {
    return new Promise<boolean>((resolve) => {
      this.serviceShared.createCompany.location.city_name = this.form.city
        ? this.form.city
        : null;
      this.serviceShared.createCompany.location.country_name = this.form
        .country
        ? this.form.country
        : null;
      this.serviceShared.createCompany.location.state_name = this.form.state
        ? this.form.state
        : null;
      this.serviceShared.createCompany.location.latitude = this.lat
        ? this.lat
        : null;
      this.serviceShared.createCompany.location.longitude = this.long
        ? this.long
        : null;
      this.serviceShared.createCompany.location.postal_code = this.form
        .postal_code
        ? this.form.postal_code
        : null;
      if (
        !this.serviceShared.createCompany.location.city_name ||
        !this.serviceShared.createCompany.location.country_name ||
        !this.serviceShared.createCompany.location.state_name
      ) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }


  performAddressInstituteValidation() {
    return new Promise<boolean>((resolve) => {
      this.serviceShared.createInstitution[0].city_name = this.form.city
        ? this.form.city
        : null;
      this.serviceShared.createInstitution[0].country_name = this.form
        .country
        ? this.form.country
        : null;
      this.serviceShared.createInstitution[0].state_name = this.form.state
        ? this.form.state
        : null;
      this.serviceShared.createInstitution[0].latitude = this.lat
        ? this.lat
        : null;
      this.serviceShared.createInstitution[0].longitude = this.long
        ? this.long
        : null;
      if (
        !this.serviceShared.createInstitution[0].city_name ||
        !this.serviceShared.createInstitution[0].country_name ||
        !this.serviceShared.createInstitution[0].state_name
      ) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  // WORKING HOURS TO
  to(value, index) {
    this.hourTo = value;
    this.masterCheck();
    this.enableDisableDateTime();
    this.enableDisableDateTimeInstitute();
  }
  // WORKING HOURS FROM
  from(value, index) {
    this.hourFrom = value;
    this.masterCheck();
    this.enableDisableDateTime();
    this.enableDisableDateTimeInstitute();
  }

  loadMap(lat, lng) {
    const latLng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
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
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    marker.setMap(this.map);
  }

  selectedDayOfWeek(selected, index) {

    if(this.isInstitute){
      this.instituteTiming[index].day_of_week = selected
    } else{
      this.timeTemplate[index].day_of_week = selected
    }

    this.dayOfWeek = selected;
    this.masterCheck();
    this.enableDisableDateTime();
    this.enableDisableDateTimeInstitute();
  }

  masterCheck() {
    const checkPoint = [
      this.hourTo,
      this.hourFrom,
      this.dayOfWeek,
      this.form.city,
      this.form.state,
      this.form.country,
      this.form.postal_code
    ];

    const result = checkPoint.every(this.isFilled);
    if (result) {
      this.checked = 1;
    } else {
      this.checked = -1;
    }
  }

  selectOffday(value, index) {

    if(this.isInstitute){
      this.instituteTiming[index].is_off_day = value
    } else {
      this.timeTemplate[index].is_off_day = value
    }

    this.dayOff = value;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  incrementTimeTemplate() {
    this.submitted = true;

      if (this.isInstitute && this.instituteTiming.length < 7) {
        this.submitted = false;
        this.instituteTiming.push({
          open_at: "",
          close_at: "",
          day_of_week: "",
          is_off_day: false,
        },);

        this.enableDisableDateTimeInstitute();
      }

      else {
        this.timeTemplate.push({
          open_at: "",
          close_at: "",
          day_of_week: "",
          is_off_day: false,
          name: ""
        });
        this.enableDisableDateTime();
      }
  }


  enableDisableDateTimeInstitute() {
    const lastElement = this.instituteTiming.length - 1;
    const isEmpty =
      this.instituteTiming[lastElement].day_of_week == "" ||
        null ||
        this.instituteTiming[lastElement].open_at == "" ||
        null ||
        this.instituteTiming[lastElement].close_at == "" ||
        null
        ? true
        : false;
    if (isEmpty) {
      this.isAddDateTimeDisabled = true;
      return;
    } else {
      this.isAddDateTimeDisabled = false;
    }
  }

  enableDisableDateTime() {
    const lastElement = this.timeTemplate.length - 1;
    const isEmpty =
      this.timeTemplate[lastElement].day_of_week == "" ||
        null ||
        this.timeTemplate[lastElement].open_at == "" ||
        null ||
        this.timeTemplate[lastElement].close_at == "" ||
        null
        ? true
        : false;
    if (isEmpty) {
      this.isAddDateTimeDisabled = true;
      return;
    } else {
      this.isAddDateTimeDisabled = false;
    }
  }

  async openCountryCodeModal() {
    const modal = await this.modalCtrl.create({
      component: CountryCodePickerComponent,
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss().then((data) => {
      this.countryCode = data.data.selected.dial_code;
      this.countryFlag = data.data.selected.flag;
    });
    return await modal.present();
  }

  goBack() {
    window.history.back();
  }

  async presentPopUp(param, index) {

    const indices = this.weekDays.filter( x => x.placement != -1 && x.placement != index ).map( x => x.day_id);
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

      this.isInstitute ? this.instituteTiming[index].day_of_week = res.data.value.day_of_week :  this.timeTemplate[index].day_of_week = res.data.value.day_of_week;
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

  removeTimeTemplate(index: number) {
    this.timeTemplate.splice(index, 1);
    this.instituteTiming.splice(index, 1);
    this.enableDisableDateTime();
    this.enableDisableDateTimeInstitute();
  }

  getShowClose(i) {
    return i !== 0;
  }

  capitalize(arr) {
    for (let i = 0; i < arr.length; i++) {
      let days = arr[i].day_of_week;
      arr[i].day_of_week = days.toUpperCase();
    }
    return arr;
  }

  isAddDateTimeDisabledTrue(){

    let arr = Object.assign([], this.isInstitute ? this.instituteTiming : this.timeTemplate)
    if(arr.length > 0){

      let lat = arr[arr.length -1 ]

      if(!lat.open_at || !lat.close_at || !lat.day_of_week){
          return true;
      }

    }

    return false;
  }
}