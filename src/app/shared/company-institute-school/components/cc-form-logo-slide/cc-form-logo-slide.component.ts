import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CommonLogicService, CompanyApiService, InstitutionApiService } from "yuzee-shared-lib";
import { ModalController } from "@ionic/angular";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { FormGroup } from "@angular/forms";
import { GenericDescriptionComponent } from "src/app/shared/generic-description/generic-description.component";
import { MAX_LENGTH } from "src/app/app.constants";
import { ProviderCodeComponent } from "../provider-code/provider-code.component";

@Component({
  selector: "app-cc-form-logo-slide",
  templateUrl: "./cc-form-logo-slide.component.html",
  styleUrls: ["./cc-form-logo-slide.component.scss"],
})
export class CcFormLogoSlideComponent extends CcBasePage implements OnInit, OnDestroy {
  @ViewChild(ProviderCodeComponent) providerCodeComponent: ProviderCodeComponent;
  @Output("moveSlide") moveSlide: EventEmitter<any> = new EventEmitter();
  @Output("formChange") formChange: EventEmitter<any> = new EventEmitter();
  @Input("instituteForm") instituteForm;
  @Input("companyForm") companyForm: FormGroup;
  @Input() isInstitute;
  @Input("profileImg") profileImg: any;
  @Input("coverImg") coverImg: any;
  @Output() editCover = new EventEmitter<any>();
  @Output() editProfile = new EventEmitter<any>();

  ncompanyLogoPhoto: any = null;

  instituteTagLine: string = null;
  institutionName: string = null;
  description: string = null;
  companyName: string = null;
  companyTagLine: string = null;
  companyURL: string = null;
  companyYuzeeURL: string = null;
  submitted = false;
  submittedInstituteForm = false;
  keyboardOpened = false;
  publicUrl: string = null;
  isUrlInUse = false;
  timeout: any;
  isCompanyNameInUse = false;

  isInstituteNameInUse;
  isYuzzeUrl;
  isCodeEmpty;
  isCodeTypeEmpty;

  validateObj;
  isAddMoreCode;
  isProviderCodeValid;
  instituteFormValid;


  codeTemplate: any = [
    {
      name: "",
      value: "",
    },
  ];

  isCodeAdded = true;

  timeTemplate: any = [
    {
      day_of_week: "",
      code: "",
    },
  ];

  // work in progress
  providerTypes: any = [];
  providerType: string = null;
  providerCode: any;
  isAddDateTimeDisabled;
  isButtonDisable = true;
  checked = -1;
  isDisabled;


  constructor(
    injector: Injector,
    private companyApiService: CompanyApiService,
    private modalCtrl: ModalController,
    private commonLogicService: CommonLogicService,
    private instituteApiService: InstitutionApiService
  ) {
    super(injector);
  }

  ngOnInit() {

    this.shared.createInstitution[0].provider_codes = this.codeTemplate;

    this.validateObj = this.commonLogicService.getValidationAfterAddProvider();

    this.shared.isAddMoreCode.subscribe((res) => { this.isButtonDisable = res });

    if (this.isButtonDisable) {
      this.checked = 1;
    }

    this.getProviderTypes();
    window.addEventListener("ionKeyboardDidShow", (ev) => {
      this.keyboardOpened = true;
    });
    window.addEventListener("ionKeyboardDidHide", () => {
      this.keyboardOpened = false;
    });
  }

  ionViewWillEnter() {
    this.instituteForm.reset();
  }

  isFilled = (currentValue) => currentValue !== null && currentValue !== "";

  // ** Required Code
  async instituteNameExists(name) {

    const data = await this.instituteApiService.isInstituteExists(name) as any;
    this.isInstituteNameInUse = data.existingInstitutionName;
    if (this.isInstituteNameInUse) {
      this.instituteForm.controls.instituteName.setErrors({ nameExistError: "Institute name already exists!" });
    } else {
      this.instituteForm.controls.instituteName.setErrors(null);
    }
  }


  async isYuzzeUrlExis(url) {
    const data = await this.instituteApiService.isYuzzeUrlExists(url) as any;
    this.isYuzzeUrl = data.alredy_exists;
    if (this.isYuzzeUrl) {
      this.instituteForm.controls.instituteYuzeeUrl.setErrors({ yuzeeUrlExistError: "Yuzee url already exists!" });
    } else {
      this.instituteForm.controls.instituteYuzeeUrl.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    if (this.isInstitute) {
      this.instituteForm.controls.instituteName.valueChanges.unsubscribe();
      this.instituteForm.controls.instituteYuzeeUrl.valueChanges.unsubscribe();
    }
  }

  titleCase(formControlName) {
    const yourControl = this.instituteForm.get(formControlName);
    yourControl.valueChanges.subscribe(() => {
      yourControl.patchValue(
        this.ccStringService.capitalizeEachFirst(String(yourControl.value)),
        { emitEvent: false }
      );
    });
  }

  resetForm() {
    this.instituteForm.reset();
  }

  ionViewDidEnter() {
    this.ncompanyLogoPhoto = this.shared.getCompanyLogoPhoto();
  }

  selectPhoto() {
    this.ccLogoService.takeLogoPhoto().then(() => {
      this.ncompanyLogoPhoto = this.shared.getCompanyLogoPhoto();
    });
  }

  async checkURL($event) {
    const url = $event?.target?.value as string;
    if (url && url !== "") {
      const isAlreadyExist = await this.companyApiService.getCompanyYuzeeUrl(url) as any;
      this.isUrlInUse = isAlreadyExist.alredy_exists;
    }
  }

  async checkName() {

    const checkNames = (array: any[], str: string) => {
      let index = array.findIndex(x => x.company_name == str)
      return index != -1;
    }

    try {
      const data = await this.companyApiService.searchCompanyByName(
        this.companyName
      ) as any;
      const companies = data.data.response as [];
      this.isCompanyNameInUse = companies.length == 0 ? false : checkNames(companies, this.companyName);
    } catch (err) {
      this.isCompanyNameInUse = false;
    }
  }

  navigateToCreateComapnyPage2() {
    this.submitted = true;
    this.shared.createCompany.company_name = this.validateCompanyName()
      ? this.companyName
      : null;
    this.shared.createCompany.tag_line = this.validateTagLine()
      ? this.companyTagLine
      : null;
    this.shared.createCompany.websiteUrl = this.validateURL(this.companyURL)
      ? this.companyURL
      : null;
    this.shared.createCompany.profilePhoto = this.ncompanyLogoPhoto
      ? this.ncompanyLogoPhoto
      : "";
    this.shared.createCompany.public_url = this.validateYuzeeUrl(this.publicUrl)
      ? this.publicUrl
      : null;
    this.shared.createCompany.provider_codes = this.codeTemplate;

    if (
      !this.shared.createCompany.public_url ||
      !this.shared.createCompany.tag_line ||
      !this.shared.createCompany.company_name ||
      this.isUrlInUse ||
      this.isCompanyNameInUse ||
      this.shared.createCompany.provider_codes.length == 0
    ) {
      return;
    }
    this.moveSlide.emit();
  }

  closeProviderCodeIfEmpty() {

    const lastElement = this.codeTemplate.length - 1;

    const isEmpty =
      this.codeTemplate[lastElement].name == "" ||
        null ||
        undefined ||
        this.codeTemplate[lastElement].value == "" ||
        null ||
        undefined
        ? true
        : false;

    if (isEmpty) {
      this.codeTemplate.splice(lastElement, 1);
      this.isCodeAdded = true;
    }
  }

  navigateToCreateInstitute() {

    this.submittedInstituteForm = true;

    this.closeProviderCodeIfEmpty();

    this.shared.createInstitution[0].name =
      this.instituteForm.get("instituteName").value;
    this.shared.createInstitution[0].tag_line =
      this.instituteForm.get("instituteTagLine").value;
    this.shared.createInstitution[0].institute_contact_detail[0].value =
      this.instituteForm.get("instituteWebsite").value;
    this.shared.createInstitution[0].readable_id =
      this.instituteForm.get("instituteYuzeeUrl").value;
    this.shared.createInstitution[0].description =
      this.instituteForm.get("instituteDescription").value;
    this.shared.createInstitution[0].provider_codes = this.codeTemplate;
    this.shared.createInstitution[0].logo_url = this.ncompanyLogoPhoto
      ? this.ncompanyLogoPhoto
      : "";
    this.moveSlide.emit();

  }

  validateURL(url: string) {
    return this.ccStringService.isValidUrl(url);
  }

  validateYuzeeUrl(url: string) {
    // alpha numeric and - hyphen accepted
    return this.publicUrl?.length > 220
      ? false
      : this.ccStringService.isYuzeeValidUrl(url);
  }

  validateTagLine() {
    return this.companyTagLine?.length > 100 || this.companyTagLine?.length < 2
      ? false
      : true;
  }

  validateCompanyName() {
    return this.companyName?.length > 220 || this.companyName?.length < 2
      ? false
      : true;
  }

  masterCheck($event, type = "") {
    const checkPoint = [
      this.companyName,
      this.companyURL,
      this.companyTagLine,
      this.publicUrl,
      this.codeTemplate[0].name,
      this.codeTemplate[0].type,
    ];

    const result = checkPoint.every(this.isFilled);

    if (result) {
      this.checked = 1;
    } else {
      this.checked = -1;
    }

    let val = $event.target.value as string

    if (type == "company_name") {
      if (val == " ") {
        return (val = "");
      }

      const str = this.ccStringService.capitalizeEachFirst(val);
      val = str;
      this.companyName = str;

      this.checkName();
    }

    if (type == "company_tagline") {
      if (val == " ") {
        return (val = "");
      }
      const str = this.ccStringService.capitalizeEachFirst(val);
      val = str;
      this.companyTagLine = str;
    }

    if (type == "yuzee_url") {
      if (val == " ") {
        this.publicUrl = "";
        return (val = "");
      }

      this.checkURL($event);
    }

    if (type == "website") {
      if (val == " ") {
        this.companyURL = "";
        return (val = "");
      }
    }
  }


  addCode() {
    this.isButtonDisable = false;

    if (this.codeTemplate.length < 3) {
      this.codeTemplate.push({
        name: "",
        value: "",
      });

    }
  }

  enableDisableAddMoreCode() {
    const lastElement = this.codeTemplate.length - 1;
    const isEmpty =
      this.codeTemplate[lastElement].name == "" ||
        null ||
        this.codeTemplate[lastElement].value == "" ||
        null
        ? true
        : false;
    if (isEmpty) {
      this.isAddMoreCode = true;
      return;
    } else {
      this.isAddMoreCode = false;
    }
  }

  getShowClose(i) {
    return i !== 0;
  }

  removeAddCode(index) {
    this.codeTemplate.splice(index, 1);
    this.isButtonDisable = true;
    this.validateObj = this.commonLogicService.getValidationAfterRemoveProvider();
  }

  masterCheckPoint() {
    const checkPoint = [this.providerType, this.providerCode];
    const providerCodeFilled = checkPoint.every(this.isFilled);
    if (providerCodeFilled) {
      this.checked = 1;
    } else {
      this.checked = -1;
    }
  }

  selectedProviderType(type, index) {
    this.codeTemplate[index].name = type;
    this.providerType = type;
    this.masterCheckPoint();
  }

  selectedProviderCode(code, index) {
    this.codeTemplate[index].value = code;
    this.providerCode = code;
    this.enableDisableAddMoreCode();
    this.masterCheckPoint();
  }

  async getProviderTypes() {
    // change to async options
    let res = (await this.companyApiService.getAllProviderCodeTypes()) as any[];
    this.providerTypes = res;
  }

  async presentPopUp($event, index) {

    let res = await this.listModalService.withoutSearch(
      "Provider Code",
      this.providerTypes,
      "shortName",
      "generic-medium-popup-modal generic-modal generic-model-backdrops",
      true,
      'Search'
    );
    if (res && res.data) {
      this.providerType = res.data?.value?.shortName;
      this.codeTemplate[index].name = this.providerType;
      this.codeTemplate[index].value = null;
      this.masterCheckPoint()
    }
  }

  codeValueUpdate($event, index: number) {
    const value = $event.target.value;
    this.codeTemplate[index].value = value;
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

  formsValid(): boolean {
    return this.instituteForm?.valid && this.providerCodeComponent.childFormGroup.valid;
  }
  uploadCoverPicture(files, file) {
    let coverFile = files.item(0);
    if (coverFile?.size <= 2097152) {
      const reader = new FileReader();
      reader.readAsDataURL(coverFile as Blob);
      reader.onload = (event) => {

        this.coverImg = (event.target).result;
        setTimeout(() => {
          this.editCover.emit({ coverImg: this.coverImg })
        }, 100);
      }
    }
  }

  uploadProfilePicture(files, file) {
    let coverFile = files.item(0);
    if (coverFile.size <= 2097152) {
      const reader = new FileReader();
      reader.readAsDataURL(coverFile as Blob);
      reader.onload = (event) => {
        this.ncompanyLogoPhoto = (event.target ).result;
        setTimeout(() => {
          this.editProfile.emit({profileImg: this.profileImg})
        }, 100);

      }

    }
}
  setProfilePicture(setProfilePicture) {
    setProfilePicture.click();
  }

  setCoverPicture(setCoverPicture) {
    setCoverPicture.click();
  }
}