/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Injector, OnInit } from "@angular/core";
import { CompanyApiService } from "yuzee-shared-lib";
import { ModalController, NavParams } from "@ionic/angular";
import { GenericDescriptionComponent } from "src/app/shared/generic-description/generic-description.component";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { AboutUsService } from "src/services/aboutUs-service";

import { CompanyHelperService } from "src/app/services/company-helper.service";
import { ConfirmationPopupComponent } from "src/app/shared";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent extends CcBasePage implements OnInit {
  companyName: string = null;
  companyDescription: string = null;
  companyTagLine: string = "";
  services: string = null;
  industryTypes: any = [];
  companyTypes: any = [];
  yearFounded = null;
  selectedType = null;
  selectedIndustry = null;
  type: any;
  industry: any;
  isYearGreater: boolean = false;
  speciality: any[] = [];
  TagColor: string = "";
  checked: number = -1;
  isCompanyNameInUse: boolean = false;
  submitted: boolean = false;
  canSubmit = false;
  selectedIndustryId: any;
  selectedCompanyId: any;
  industry_id: any;
  industryTypesResponse: any[];
  isProfileInstitution = false;
  isFilled = (currentValue: any) =>
    currentValue !== null && currentValue !== "";

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editCompany: any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    injector: Injector,
    private ccHelperService: CompanyHelperService,
    private companyAPI: CompanyApiService,
    public aboutUs: AboutUsService,
    public popupModal: ModalController,
    private navParams: NavParams
  ) {
    super(injector);
  }

  ngOnInit() {
    this.isProfileInstitution = this.navParams.get("isProfileInstitution");
    this.setData();
    this.getCompanyType();
    this.getIndustryTypes();
  }

  saveInstiute() {}

  setData() {
    if (this.shared.companyProfile) {
      this.companyName = this.shared.companyProfile.company_name;
      this.companyDescription = this.shared.companyProfile.description;
      this.companyTagLine = this.shared.companyProfile.tag_line;
      this.industry = this.shared.companyProfile.industry_type;
      this.industry_id = this.shared.companyProfile.industry_id;
      this.type = this.shared.companyProfile.company_type;
      this.speciality = [].concat(this.shared.companyProfile.speciality);
      this.yearFounded = this.shared.companyProfile.year_founded;
      this.editCompany = this.shared.companyProfile;
      this.selectedIndustryId = this.shared.companyProfile.industry_id;

      this.editCompany.company_sub_type = "JOB_SEARCH_AGENCY";
    }
  }

  getCompanyType() {
    this.companyAPI.getCompanyType().then((res: any[]) => {
      this.companyTypes = res.map((item, index) => ({
        company_id: index + 1,
        company_name: item,
      }));
    });
  }

  getIndustryTypes() {
    this.companyAPI.getIndustries("", 1, 100).then((res: any) => {
      this.industryTypesResponse = res.response;
      this.industryTypes = res.response.map((x) => x.industry_name);
    });
  }

  async dismiss(data) {
    if (this.canSubmit) {
      const res = await this.ccUtilityService.showConfirmPopOver();
      if (res) {
        this.ccModalService.dismiss(data);
      }
    } else {
      this.ccModalService.dismiss(data);
    }
  }

  async openDescriptionModal() {
    const modal = await this.popupModal.create({
      component: GenericDescriptionComponent,
      componentProps: { data: this.companyDescription, heading: "Description" },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data.data !== "" && dataReturned.data.isSaved) {
          this.canSubmit = true;
          this.companyDescription = dataReturned.data.data;
        }
      }
    });
    return await modal.present();
  }

  async presentSearchableRadio(param, $event) {
    if (param == "industry") {
      const resIndustry = (await this.ccHelperService.selectIndustry()) as any;
      if (resIndustry.data && resIndustry.data.value) {
        this.industry = resIndustry.data.value.industry_name;
        this.editCompany.industry = this.industry;
        this.editCompany.industry_type = this.industry;
        this.selectedIndustryId = resIndustry.data.value.industry_id;
      }
    }

    if (param == "type") {
      const resType = (await this.ccHelperService.selectCompany()) as any;
      if (resType.data && resType.data.value) {
        this.type = resType.data.value.company_name;
        this.editCompany.company_type = this.type;
        this.selectedCompanyId = resType.data.value.company_id;
      }
    }

    if (param == "specialities") {
      const resSpeciality =
        (await this.ccHelperService.selectSpecialities()) as any;
      if (resSpeciality) {
        this.speciality = resSpeciality;
      }
    }
  }

  onYearChange($event) {
    if ($event.inputType !== "deleteContentBackward") {
      const firstChar = $event.target.value[0];
      const regix = /[A-Za-z0]/g;

      if (firstChar.match(regix)) {
        $event.target.value = "";
        this.yearFounded = "";
        this.isYearGreater = false;
        return;
      }

      const digits = this.ccStringService.getOnlyDigits($event.target.value);
      const current_year = new Date().getFullYear();
      const entered_year = parseInt(digits, 10);
      $event.target.value = isNaN(entered_year) ? "" : entered_year.toString();
      this.yearFounded = isNaN(entered_year) ? "" : entered_year.toString();
      if (entered_year > current_year) {
        this.isYearGreater = true;
      } else {
        this.isYearGreater = false;
      }
    } else {
      this.isYearGreater = false;
    }
  }

  async openSkillsModal($event) {
    $event.stopPropagation();
    const response = (await this.companyAPI.getSpecialities(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.selectedIndustryId,
      "",
      1,
      10
    )) as any;
    let data = response.response;
    let modal = await this.listModalService.multiFullScreen(
      "Specialities",
      data,
      "speciality_name",
      "",
      "Search",
      this.speciality
    );
    if (modal) {
      if (modal.data != undefined) {
        const addedData = [];
        modal.data.find((item) => {
          if (item.isActive) {
            addedData.push({
              speciality_id: item.speciality_id,
              speciality_name: item.speciality_name,
              added: true,
            });
          }
        });
        this.speciality = addedData;
      }
    }
  }

  removeSkill(item, i: number) {
    this.speciality.splice(i, 1);
  }

  applyAfect(speciality) {
    this.speciality[speciality].istap = true;
    if (this.speciality[speciality].isActive) {
      this.TagColor = "#2C68A1";
      setTimeout(() => {
        this.speciality[speciality].istap = false;
      }, 500);
    } else {
      this.TagColor = "#E4E6ED";
      setTimeout(() => {
        this.speciality[speciality].istap = false;
      }, 500);
    }
  }

  async save() {
    const modal = await this.popupModal.create({
      component: ConfirmationPopupComponent,
      showBackdrop: true,
      mode: "ios",
      cssClass:
        "generic-alert-back-delete-modal generic-modal generic-model-backdrops",
      swipeToClose: true,
      backdropDismiss: true,
      componentProps: {
        extraParams: {
          heading: "CONFIRMATION",
          message: "Are you sure you want to save this information?",
          button: "Save",
        },
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data === "OK") {
        this.submitted = true;
        this.editCompany.company_name = this.validateCompanyName()
          ? this.companyName.trim()
          : null;
        this.editCompany.tag_line = this.validateTagLine()
          ? this.companyTagLine.trim()
          : null;
        this.editCompany.industry_id = this.selectedIndustryId;
        this.editCompany.industry_type = this.industry;
        this.editCompany.company_type = this.type;
        this.editCompany.description = this.validateDescription()
          ? this.companyDescription.trim()
          : null;
        this.editCompany.year_founded =
          this.validateYearFounded() && !this.isYearGreater
            ? this.yearFounded
            : null;
        this.editCompany.speciality = this.validateSpeciality()
          ? this.speciality
          : null;

        if (
          !this.editCompany.company_name ||
          !this.editCompany.tag_line ||
          !this.editCompany.industry_type ||
          !this.editCompany.company_type ||
          !this.editCompany.description ||
          !this.editCompany.year_founded ||
          !this.editCompany.speciality
        ) {
          return;
        }

        this.ccHelperService
          .editCompanyProfileStepOne(this.editCompany)

          .then((res) => {
            this.ccHelperService
              .editCompanyProfileStepTwo(this.editCompany)

              .then((resa) => {
                this.ccModalService.dismiss({ updated: true });
                this.shared.companyDetailsChanged.next();
              })
              .catch((erra) => {
                this.ccUtilityService.presentToast("Unable To Update Company");
              });
          })
          .catch((err) => {
            this.ccUtilityService.presentToast("Unable To Update Company");
          });
      }
    });
    return await modal.present();
  }

  validateCompanyName() {
    return this.companyName.length > 220 || this.companyName.length < 2
      ? false
      : true;
  }

  validateTagLine() {
    return this.companyTagLine.length > 100 || this.companyTagLine.length < 2
      ? false
      : true;
  }

  validateSpeciality() {
    return this.speciality.length == 0 ? false : true;
  }

  validateDescription() {
    return this.companyDescription.length > 3000 ||
      this.companyDescription.length < 30
      ? false
      : true;
  }

  validateYearFounded() {
    return this.yearFounded.toString().length !== 4 ? false : true;
  }

  async checkName() {
    try {
      if (this.companyName === this.editCompany.company_name) {
        return;
      }
      const data = (await this.companyAPI.searchCompanyByName(
        this.companyName
      )) as any;
      const companies = data.data.response;
      this.isCompanyNameInUse = companies.length == 0 ? false : true;
    } catch (err) {
      this.isCompanyNameInUse = false;
    }
  }

  masterCheck($event, type = "") {
    let checkPoint = [
      this.companyName,
      this.yearFounded,
      this.companyDescription,
      this.type,
      this.industry,
    ];

    let result = checkPoint.every(this.isFilled);
    if (result) {
      this.checked = 1;
    } else {
      this.checked = -1;
    }

    if (type == "company_name") {
      let str = this.ccStringService.capitalizeEachFirst($event.target.value);
      $event.target.value = str;
      str = this.shared.removeExtraWhiteSpaces($event);
      this.companyName = str;
    }
  }

  setCanSubmit() {
    this.canSubmit = true;
  }
}
