import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { GenericDescriptionComponent } from "src/app/shared/generic-description/generic-description.component";
import { CompanyApiService } from "yuzee-shared-lib";
import { ModalController } from "@ionic/angular";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { MAX_LENGTH } from "src/app/app.constants";

@Component({
  selector: "app-cc-form-desc-slide",
  templateUrl: "./cc-form-desc-slide.component.html",
  styleUrls: ["./cc-form-desc-slide.component.scss"],
})
export class CcFormDescSlideComponent extends CcBasePage implements OnInit {

  @Output("moveSlide") moveSlide: EventEmitter<any> = new EventEmitter();
  name = "name";
  companyTypes: any = [];
  industryTypes: any = [];
  // this variable is duplicate for mapping out original api response as per code
  industryTypesResponse: any = [];
  selectedIndustryId;
  selectedCompanyId;
  // End
  searchEmpty = true;
  checked = -1;
  modifiedCompanyType;
  submitted = false;
  TagColor = "";
  isYearGreater = false;
  // BINDINGS
  yearFounded: string = null;
  type: string = null;
  industry: string = null;
  description: string = null;
  specialties: string = null;
  lang: string;
  speciality: any[] = [];
  selectedSpeciality: any[] = [];

  constructor(
    injector: Injector,
    private ccHelperService: CompanyHelperService,
    private modalCtrl: ModalController,
    private sharedService: SharedService,
    public popupModal: ModalController,
    private api: CompanyApiService
  ) {
    super(injector);
  }

  isFilled = (currentValue) => currentValue !== null && currentValue !== "";

  ngOnInit() {

  }

  navigateToCreateComapnyPage3() {
    this.submitted = true;
    this.shared.createCompany.description = this.validateDescription()
      ? this.description
      : null;
    this.shared.createCompany.year_founded = this.validateYearFounded()
      ? this.yearFounded
      : null;
    this.sharedService.createCompany.speciality = this.validateSpeciality()
      ? this.speciality
      : null;
    this.sharedService.createCompany.industry_id = this.selectedIndustryId;

    if (
      !this.shared.createCompany.description ||
      !this.shared.createCompany.company_type ||
      !this.shared.createCompany.industry_type ||
      !this.shared.createCompany.year_founded ||
      !this.shared.createCompany.speciality ||
      !this.shared.createCompany.industry_id
    ) {
      return;
    }
    this.moveSlide.emit();
  }

  validateSpeciality() {
    return this.speciality.length == 0 ? false : true;
  }

  validateDescription() {
    return this.description.length > 3000 || this.description.length < 30
      ? false
      : true;
  }

  validateYearFounded() {
    return this.yearFounded.length !== 4 ? false : true;
  }

  selectedIndustry(value) {
    this.industry = value;
    this.masterCheck();
  }

  selectedType(value) {
    this.type = value;
    this.masterCheck();
  }

  masterCheck() {
    const checkPoint = [
      this.yearFounded,
      this.description,
      this.type,
      this.industry,
    ];

    const result = checkPoint.every(this.isFilled);
    if (result) {
      this.checked = 1;
    } else {
      this.checked = -1;
    }
  }

  async presentSearchableRadio(param) {

    if (param == "industry") {
      const resIndustry = await this.ccHelperService.selectIndustry() as any;
      if (resIndustry.data && resIndustry.data.value) {
        this.industry = resIndustry.data.value.industry_name;
        this.sharedService.createCompany.industry = this.industry;
        this.sharedService.createCompany.industry_type = this.industry;
        this.selectedIndustryId = resIndustry.data.value.industry_id;
      }
    }

    if (param == "type") {

      const resType = await this.ccHelperService.selectCompany() as any;
      if (resType.data && resType.data.value) {
        this.type = resType.data.value.company_name;
        this.sharedService.createCompany.company_type = this.type;
        this.selectedCompanyId = resType.data.value.company_id;
      }

    }

    if (param == "specialities") {

      const resSpeciality = await this.ccHelperService.selectSpecialities() as any;
      if (resSpeciality) {
        this.speciality = resSpeciality;
        this.sharedService.createCompany.speciality = resSpeciality
      }

    }
  }

  async openDescriptionModal() {
    const modal = await this.modalCtrl.create({
      component: GenericDescriptionComponent,
      componentProps: {
        data: this.description,
        heading: "Description",
        minLength: MAX_LENGTH.min,
        maxLength: MAX_LENGTH.max,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data.isSaved) {
        if (dataReturned.data.data !== "") {
          this.description = dataReturned.data.data;
        }
      }
    });
    return await modal.present();
  }

  async openSkillsModal($event) {
    $event.stopPropagation();
    const response = await this.api.getSpecialities(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.selectedIndustryId,
      "",
      1,
      10
    ) as any;
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

  updateSpeciality($event) {
    this.speciality = $event
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

  onYearChange($event) {
    if ($event.inputType !== "deleteContentBackward") {
      const digits = this.ccStringService.getOnlyDigits($event.target.value);
      const current_year = new Date().getFullYear();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
}
