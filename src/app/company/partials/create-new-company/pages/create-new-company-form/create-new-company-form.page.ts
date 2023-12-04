/* eslint-disable @typescript-eslint/unbound-method */
import { Component, Injector, ViewChild } from "@angular/core";
import { CcBasePage } from "../../../../../shared/cc-base-page/cc-base-page";
import { IonSlides } from "@ionic/angular";
import { Validators } from "@angular/forms";


@Component({
  selector: "app-create-new-company-form",
  templateUrl: "./create-new-company-form.page.html",
  styleUrls: ["./create-new-company-form.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CreateNewCompanyFormPage extends CcBasePage {
  @ViewChild(IonSlides) slider: IonSlides;

  instituteForm = this.formBuilder.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    instituteName: ["", [Validators.required, Validators.maxLength(220)]],
    instituteTagLine: ["", [Validators.required, Validators.maxLength(100)]],
    instituteWebsite: [
      "",
      [
        Validators.required,
        Validators.pattern(
          /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/
        ),
      ],
    ],
    instituteYuzeeUrl: ["", [Validators.required, Validators.maxLength(30)]],
  });

  companyForm = this.formBuilder.group({});

  constructor(injector: Injector) {
    super(injector);
  }

  ionViewDidLoad() {
    this.slider.lockSwipes(true);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async moveToNext() {
    this.slider.slideNext();
  }

  ionViewWillEnter() {
    this.instituteForm.reset();
  }

  backSlide() {
    this.slider.getActiveIndex().then(async (index) => {
      if (index == 0) {
        const res = await this.ccUtilityService.showConfirmPopOver();
        if (res) {
          window.history.back();
        }
      }
    });
    this.slider.slidePrev();
  }

  formChange($event) {
    // form change event function will be used later
  }
}
