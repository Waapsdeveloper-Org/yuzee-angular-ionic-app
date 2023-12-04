import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyApiService } from "yuzee-shared-lib";
import { EditPartnersComponent } from "../edit-partners/edit-partners.component";
import { partnerCompanySliderArray } from "src/app/app.constants";

@Component({
  selector: "app-see-all-partners",
  templateUrl: "./see-all-partners.component.html",
  styleUrls: ["./see-all-partners.component.scss"],
})
export class SeeAllPartnersComponent extends CcBasePage implements OnInit {
  selectedTab: any = "institution";
  partnerCompanies: any[] = [];
  partnerInstitutes: any[] = [];
  pageNumberInstitute = 1;
  limitInstitute = 1;
  pageNumberCompany = 1;
  limitCompany = 1;
  pageSize = 10;
  isLoading: boolean = false;
  partnerCompanySlider = partnerCompanySliderArray;
  constructor(injector: Injector, private companyApi: CompanyApiService) {
    super(injector);
  }

  ngOnInit() {
    this.startSearch(false, true);
  }

  async startSearch(paginate = false, isInit = false) {
    let res;
    this.isLoading = true;
    if (this.selectedTab == "company") {
      res = await this.getCompanyPartnersSearch();
    } else if (this.selectedTab == "institution") {
      res = await this.getInstituteBySearch();
    }
    const value = res.response.company_partners;
    if (value.length !== 10) {
      if (this.selectedTab == "company") {
        this.limitCompany = -1;
      } else if (this.selectedTab == "institution") {
        this.limitInstitute = -1;
      }
    }
    if (!paginate) {
      if (this.selectedTab == "company") {
        this.partnerCompanies = [].concat(value);
      } else if (this.selectedTab == "institution") {
        this.partnerInstitutes = [].concat(value);
      }
    } else if (paginate) {
      if (this.selectedTab == "company") {
        this.partnerCompanies = this.partnerCompanies.concat(value);
      } else if (this.selectedTab == "institution") {
        this.partnerInstitutes = this.partnerInstitutes.concat(value);
      }
    }
    this.isLoading = false;
  }

  loadMore($event) {
    if (this.selectedTab == "company") {
      if (this.limitCompany !== -1) {
        this.pageNumberCompany++;
        this.startSearch(true);
      }
    } else if (this.selectedTab == "institution") {
      if (this.limitInstitute !== -1) {
        this.pageNumberInstitute++;
        this.startSearch(true);
      }
    }
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }

  setSelectedTab(tab) {
    if (this.isLoading) {
      return;
    }
    this.selectedTab = tab;
    if (
      this.partnerCompanies.length == 0 ||
      this.partnerInstitutes.length == 0
    ) {
      this.startSearch();
    }
  }

  dismiss() {
    this.ccModalService.dismiss();
  }

  async edit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await this.ccModalService.present(EditPartnersComponent, {
      selectedTab: this.selectedTab,
      _selectedCompanies: this.partnerCompanies,
      _selectedInstitutes: this.partnerInstitutes,
    });

    this.startSearch(false, true);
  }

  getInstituteBySearch() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = await this.companyApi.getCompanyPartners(
        this.shared.companyId,
        this.pageNumberInstitute,
        10,
        "INSTITUTE"
      ) as any;
      
      resolve(res.data);
    });
  }

  getCompanyPartnersSearch() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = await this.companyApi.getCompanyPartners(
        this.shared.companyId,
        this.pageNumberCompany,
        10,
        "COMPANY"
      ) as any;
      
      resolve(res.data);
    });
  }
}
