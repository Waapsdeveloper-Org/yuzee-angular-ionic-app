/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Injector, Input, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { EditPartnersComponent } from "./edit-partners/edit-partners.component";
import { SeeAllPartnersComponent } from "./see-all-partners/see-all-partners.component";
import { partnerCompanySliderArray } from "src/app/app.constants";
@Component({
  selector: "app-partners",
  templateUrl: "./partners.component.html",
  styleUrls: ["./partners.component.scss"],
})
export class PartnersComponent extends CcBasePage implements OnInit {
  @Input() isInstitute;
  isPartnerEmpty: boolean = true;
  isCompanyEmpty: boolean = true;
  selectedTab: any = "institution";
  partnerInstitutes: any[] = [];
  partnerCompanies: any[] = [];
  hide: boolean = false;
  isLoading: boolean = true;

  partnerCompanySlides = {};
  partnerCompanySlider = partnerCompanySliderArray;
  constructor(injector: Injector) {
    super(injector);
    this.shared.companyPartnerCompaniesFetched.subscribe((res) => {
      this.getCompanyPartners(res);
    });
    this.shared.companyPartnerInstitutesFetched.subscribe((res) => {
      this.getCompanyInstitutes(res);
    });
    setTimeout(() => {
      this.partnerCompanySlides = {
        initialSlide: 0,
        slidesPerView: this.checkScreen(),
        speed: 400,
      };
    } , 1000);
  }

  ngOnInit() {}

  getCompanyPartners(res) {
    if (res?.data?.response?.company_partners.length > 0) {
      this.isCompanyEmpty = false;
      this.partnerCompanies = res.data.response.company_partners;
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.isCompanyEmpty = true;
    }
  }

  getCompanyInstitutes(res) {
    if (res?.data?.response?.company_partners.length > 0) {
      this.isPartnerEmpty = false;
      this.isLoading = false;
      this.partnerInstitutes = res.data.response.company_partners;
    } else {
      this.selectedTab = 'company';
      this.isLoading = false;
      this.isPartnerEmpty = true;
    }
  }

  async editOurPartners() {
    const res = await this.ccModalService.present(EditPartnersComponent, {
      selectedTab: this.selectedTab,
    }, "modal-full-screen-view", "right", "md");
  }

  setSelectedTab(tab) {
    this.selectedTab = tab;
  }

  seeMore() {
    this.ccModalService.present(SeeAllPartnersComponent, {
      selectedTab: this.selectedTab,
    }, "modal-full-screen-view", "right", "md");
  }
  checkScreen() {
    if (window.innerWidth >= 750) {
      return 4;
    } else {
      return 2.8;
    }
  }
}

