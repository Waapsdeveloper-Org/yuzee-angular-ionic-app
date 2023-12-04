import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { companyAboutUsSliderArray } from "src/app/app.constants";
import { TellUsMoreAboutEditComponent } from "src/app/institution/partials/institution-profile/tell-us-more-about-edit/tell-us-more-about-edit.component";
import { IntakesSelectDateComponent } from "src/app/institution/partials/intakes-select-date/intakes-select-date.component";
import { CcModalService } from "src/app/services/cc-modal.service";
import { SharedService } from "src/app/services/shared.service";
import { enterFromRightAnimation } from "src/app/shared/page-transitions/page-enter-transition";
import { leaveToRightAnimation } from "src/app/shared/page-transitions/page-leave-transition";
import { ToastService } from "src/services/toast.service";
import { InstitutionApiService } from "yuzee-shared-lib";
@Component({
  selector: "app-aboutus",
  templateUrl: "./aboutus.component.html",
  styleUrls: ["./aboutus.component.scss"],
})
export class AboutusComponent implements OnInit {
  @Input("isInstitute") isInstitute;
  @Input("openFrom") openFrom = '';
  @Input() hasAccessUpdate;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: this.checkScreen(),
    speed: 400,
  };
  aboutUsData: any = {};
  specialities: any[] = [];

  moreAboutItems = companyAboutUsSliderArray;

  institute;
  instituteSliderData;
  isMoreData;
  constructor(
    private sharedService: SharedService,
    private toastService: ToastService,
    private institutionApiService: InstitutionApiService,
    private ccModalService: CcModalService,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    if (this.isInstitute) {
      this.sharedService.basicInfo.subscribe((res) => {this.institute = res?.description})

      this.sharedService.editInstituteProfile.subscribe((res) => { this.institute = res.description });

      this.sharedService.editMoreAboutUs.subscribe((res) => {

        this.instituteSliderData = res;
      });

      this.institutionApiService.moreAboutInstituionInfo(this.sharedService.instituteId, true).then((res) => {
        this.instituteSliderData = res;

      });
    } else {
      this.sharedService.companyDetailsFetched.subscribe((res) => {

        this.aboutUsData = res;
        this.paginateSpecialities();
      });
    }
  }

  paginateSpecialities() {
    if (this.aboutUsData.speciality.length > 5) {
      this.specialities = this.aboutUsData.speciality.splice(0, 5);
    } else {
      this.specialities = this.aboutUsData.speciality;
    }
  }

  seemore() {
    if (this.aboutUsData.speciality.length > 0) {
      this.specialities = this.specialities.concat(this.aboutUsData.speciality);
    }
  }

  seeless() {
    if (this.specialities.length > 0) {
      this.specialities.splice(5, this.specialities.length);
    }
  }
  checkScreen() {
    if (window.innerWidth >= 750) {
      return 2.8;
    } else {
      return 1.4;
    }
  }
  viewTagFull() {
    this.toastService.presentToast('11 October 2021 - 20 November 2021');
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.sharedService.instituteBasicInfo.unsubscribe();
    this.sharedService.editMoreAboutUs.unsubscribe();
  }

  async openEditMoreAbout() {
    const modal = await this.modalCtrl.create({
      component: TellUsMoreAboutEditComponent,
      cssClass: 'modal-full-screen-view',
      enterAnimation: enterFromRightAnimation,
      leaveAnimation: leaveToRightAnimation,
      componentProps: { isTellUsHide: true,  setMoreAboutData: this.instituteSliderData}
    }
    );
    return await modal.present();
  }
   openEditInTakes(){
    this.ccModalService.present(IntakesSelectDateComponent, {}, "modal-full-screen-view", "right", "md");
  }
}
