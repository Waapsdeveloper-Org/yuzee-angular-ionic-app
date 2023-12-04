/* eslint-disable @typescript-eslint/no-shadow */
import { Component, Injector, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { CcBasePage } from "../../../../../shared/cc-base-page/cc-base-page";
import { UpperCasePipe } from "@angular/common";
import { companyInstituteData } from "src/constants/company-institute-data";


@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.page.html",
  styleUrls: ["./introduction.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class IntroductionPage extends CcBasePage {
  @ViewChild(IonSlides) slider: IonSlides;

  business_account_type = [];
  business_account_private_or_public: any;
  institute_affiliation_type = [];

  companyOrInstituteItems = [];
  selectedType: any;

  schoolOrUniversityItems = [];
  schoolOrUniversitySelectedItem: any;
  isSchoolSelected = false;
  // eslint-disable-next-line id-denylist
  schoolTypeSelected = { number: 0 };

  universityTypes = [];
  selectedUniversityType: any;
  isNextButtonDisable = true;

  mainSelection: any;

  typeList = [];
  typeListOptions = []
  isNextHidden = true;
  slidesSelection: any;
  selectedTypeListOption = {};
  title: string;

  slideOpts = {
    allowTouchMove: false,
    initialSlide: 0,
    speed: 400
  };

  constructor(
    injector: Injector,
    // eslint-disable-next-line no-shadow
    private UpperCasePipe: UpperCasePipe
  ) {
    super(injector);
  }


  ionViewWillEnter() {
    this.slider.slideTo(0);
    this.mainSelection = null;
    this.business_account_type = [];
    this.institute_affiliation_type = [];
  }

  ionViewDidLoad() {
    this.slider.lockSwipes(true);
  }

  setMainSelection(selection) {
    this.mainSelection = selection;
    switch (selection) {
      case "company":
        this.companyOrInstituteItems = companyInstituteData.company;
        this.title = "Select a type from the options below";
        break;

      case "institution":
        this.companyOrInstituteItems = companyInstituteData.institution;
        this.title = "Create your institution/company account"
        break;
    }
    this.slider.slideNext();
  }

  selectListItem(index: number) {
    this.selectedType = this.companyOrInstituteItems[index];
    this.business_account_type.push(this.selectedType);
    this.institute_affiliation_type.push(this.selectedType);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.shared.createInstitution[0].business_account_type = this.UpperCasePipe.transform(this.selectedType.title);
    this.shared.createInstitution[0].institute_category_type_id = this.selectedType.id;


    if (index == 0 && this.mainSelection === "institution") {
      this.schoolOrUniversityItems = companyInstituteData.schoolTypeList;
      this.isSchoolSelected = true;
      this.isNextHidden = false;
      this.isNextButtonDisable = false;
      this.nextPage();
    }
    else if (index == 1 && this.mainSelection === "institution") {
      this.schoolOrUniversityItems = companyInstituteData.universityTypes;
      this.isSchoolSelected = false;
      this.nextPage();
    }
    else if (this.mainSelection === "company") {
      this.schoolOrUniversityItems = companyInstituteData.communityServiceAndtraining
      this.isSchoolSelected = false;
      this.isNextHidden = true;
      this.isNextButtonDisable = true;
      this.slider.slideNext();
    }
    else { this.nextPage(); }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async schoolOrUniversityItem(index: number) {

    this.schoolOrUniversitySelectedItem = this.schoolOrUniversityItems[index];
    if (this.mainSelection === "institution") {
      this.universityTypes = companyInstituteData.universityTypeList;


      if (this.selectedType?.id == 1) {
        this.schoolOrUniversitySelectedItem.isSelected = !this.schoolOrUniversitySelectedItem.isSelected;

        if (this.schoolOrUniversitySelectedItem.isSelected) {
          this.schoolTypeSelected.number++;
          this.shared.createInstitution[0].institute_type.push(this.schoolOrUniversitySelectedItem.title);
        }
        else {
          this.schoolTypeSelected.number--;
          this.shared.createInstitution[0].institute_type.splice(this.shared.createInstitution[0].institute_type.indexOf(this.schoolOrUniversitySelectedItem.title), 1);
          index--;
        }

        if (this.schoolTypeSelected.number > 0) {
          this.isNextButtonDisable = true;
        }
        else {
          this.isNextButtonDisable = false;
        }

      }
      else if (this.selectedType?.id == 2) {
        this.schoolOrUniversitySelectedItem = this.schoolOrUniversityItems[index];
        if (this.schoolOrUniversitySelectedItem.id == 3) {
          this.shared.createInstitution[0].institute_affiliaction_type = this.schoolOrUniversitySelectedItem.title;
          this.ccNavService.push(
            "create-new-company/create-institution-form"
          );

        } else {
          this.nextPage();
        }
      }
    } else if (this.mainSelection === "company") {
      this.universityTypes = companyInstituteData.employmentServices;
      this.isSchoolSelected = false;
      this.isNextHidden = true;
      this.slider.slideNext();
    }
  }

  schoolUniversityTypes(index) {

    this.selectedUniversityType = this.universityTypes[index];
    this.institute_affiliation_type.push(this.selectedUniversityType);
    this.shared.createInstitution[0].institute_affiliaction_type = this.selectedUniversityType.title;
    this.nextPage();
  }

  async back() {

    const index = await this.slider.getActiveIndex();

    if (this.schoolTypeSelected.number > 0 && index == 3 && this.mainSelection == "institution") {
      this.isNextButtonDisable = true;
      this.isNextHidden = false;
      this.isSchoolSelected = true;
    }

    else if (index !== 2) {
      this.isNextHidden = true;
      this.selectedType = null;
      this.isNextButtonDisable = false;
    } else { this.isNextHidden = true; }

    this.business_account_type = [];
    this.institute_affiliation_type = [];

    if (index == 0) {
      return this.ccNavService.pop();
    } else if (index == 1 && this.mainSelection == "company") {
      this.slider.slidePrev();
      this.selectedType = null;
    }

    this.slider.slidePrev();
  }

  async nextPage() {
    const slideIndex = await this.slider.getActiveIndex();
    const isSlideEnd = await this.slider.isEnd();

    if (this.selectedType.id === 2 && slideIndex == 1) {
      this.shared.createInstitution[0].institute_type = [];
      this.selectedUniversityType = null;
      this.schoolOrUniversitySelectedItem = null;
    }

    if (this.isSchoolSelected && slideIndex == 1) {

      this.shared.createInstitution[0].institute_type = [];
      //* * Required Comment ** dismiss school options on back()
      for (let i = 0; i < 3; i++) {
        this.schoolOrUniversityItems[i].isSelected = false;
        // eslint-disable-next-line id-denylist
        this.schoolTypeSelected.number = 0;
      }
    }

    if (isSlideEnd && this.mainSelection === "company") {
      return this.ccNavService.push(
        "create-new-company/create-new-company-form"
      );
    }
    else if (slideIndex == 2) {
      this.isNextHidden = true;
      this.isSchoolSelected = false;
    }

    if (isSlideEnd && this.mainSelection === "institution") {
      this.selectedUniversityType = null;
      this.schoolOrUniversitySelectedItem = null;
      this.ccNavService.push(
        "create-new-company/create-institution-form"
      );
    }

    this.slider.slideNext();
  }

  disableNext() {
    if (this.mainSelection == "institution") {
      return this.selectedType ? false : true;
    }
  }
}