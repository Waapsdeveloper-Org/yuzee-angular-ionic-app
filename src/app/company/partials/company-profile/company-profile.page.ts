/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyApiService, CommonApiService } from "yuzee-shared-lib";
import { TranslateService } from "@ngx-translate/core";
import { CcBasePage } from "../../../shared/cc-base-page/cc-base-page";
import { AppGenericService } from "src/services/generic.service";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { ModalController } from "@ionic/angular";


@Component({
  selector: "app-company-profile",
  templateUrl: "./company-profile.page.html",
  styleUrls: ["./company-profile.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CompanyProfilePage extends CcBasePage implements OnInit {
  selected = "home";
  lang: string;
  company: any;
  locationObj: any;
  workingHours: any;
  ncontactDetails: any;

  constructor(
    injector: Injector,
    private genericServices: AppGenericService,
    private translate: TranslateService,
    private companyAPI: CompanyApiService,
    private modalCtrl: ModalController,
    public router: Router,
    private commonAPI: CommonApiService,
    public companyHelperService: CompanyHelperService
  ) {
    super(injector);
    let companyID = localStorage.getItem("company_id");
    if (companyID) {
      this.shared.companyId = companyID;
      this.companyHelperService.companyId = companyID;
    }
    this.getCompanyDetails();

    this.shared.companyDetailsChanged.subscribe(() => {
      this.getCompanyDetails();
    });
  }

  ngOnInit() {
    this.genericServices.getUserDetails().then((res) => {});
  }

  getCompanyDetails() {
    this.companyAPI.getCompanyDetails(this.shared.companyId).then((res) => {

      
      if (res["data"]) {
        this.shared.companyProfile = res["data"];
        this.locationObj = res["data"]?.location;
        this.shared.companyDetailsFetched.next(res["data"]);
      }
    });

    this.companyAPI.getWorkWithUs(this.shared.companyId).then((res) => {
      this.shared.companyWorkWithUsFetched.next(res);
    });

    this.companyAPI
      .getCompanyPartners(this.shared.companyId, 1, 5, "COMPANY")
      .then((res) => {
        this.shared.companyPartnerCompaniesFetched.next(res);
      });

    this.companyAPI
      .getCompanyPartners(this.shared.companyId, 1, 5, "INSTITUTE")
      .then((res) => {
        this.shared.companyPartnerInstitutesFetched.next(res);
      });

    this.companyAPI
      .getCompanyAchievement(this.shared.companyId, 1, 3)
      .then((res: any) => {
        this.shared.companyAchievementsFetched.next(res);
      });

    this.companyAPI.getCompanyAward(this.shared.companyId, 1, 5).then((res) => {
      this.shared.companyAwardsFetched.next(res);
    });

  
    this.companyAPI
      .getCompanyContactDetails(this.shared.companyId)
      .then((res) => {
        this.ncontactDetails = res["data"];
        this.shared.companyContactDetailsFetched.next(res);
      });
   

    this.companyHelperService.getCompanyContactDetails();
    this.companyHelperService.getCompanyFaqList();

    this.companyAPI.companyBannerApi(this.shared.companyId).then((res: any) => {
      this.shared.companyBannerInfoFetched.next(res);
    });

    this.companyAPI
      .getCompanyWorkingHours(this.shared.companyId)
      .then((res) => {
        this.workingHours = res["data"];
        this.shared.companyWorkingHoursFetched.next(res);
      });
  }

  languageSet() {
    if (localStorage.getItem("Language")) {
      this.lang = localStorage.getItem("Language");
      this.translate.use(this.lang);
    } else {
      this.translate.setDefaultLang("en");
      localStorage.setItem("Language", "en");
    }
  }

  goBack() {
    window.history.back();
  }

  changeCompanyData($event) {
    let value = $event.target.value;
    if (value !== "") {
      this.companyAPI
        .getCompanyInitialInfo(value)
        .then((res) => {
          if (res) {
            this.shared.companyDetailsChanged.next();
          }
        })
        .catch((err) => {
        });
    }
  }
  
}
