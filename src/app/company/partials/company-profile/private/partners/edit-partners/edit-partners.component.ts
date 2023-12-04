/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-underscore-dangle */
import { Component, Injector, OnInit } from "@angular/core";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyApiService } from "yuzee-shared-lib";
import { SearchPartnersComponent } from "../search-partners/search-partners.component";
@Component({
  selector: "app-edit-partners",
  templateUrl: "./edit-partners.component.html",
  styleUrls: ["./edit-partners.component.scss"],
})
export class EditPartnersComponent extends CcBasePage implements OnInit {
  partnerInstitutes: any[] = [];
  partnerCompanies: any[] = [];
  selectedTab = "company";
  canSubmit: boolean = false;
  _selectedCompanies: any = [];
  _selectedInstitutes: any = [];
  constructor(injector: Injector, private companyApi: CompanyApiService, private ccHelperService: CompanyHelperService) {
    super(injector);
  }

  async ngOnInit() {
    this._selectedCompanies = await this.getCompanyPartnersSearch();
    this._selectedInstitutes = await this.getInstituteBySearch();
    if (this._selectedCompanies.length > 0) {



      this._selectedCompanies = this._selectedCompanies.map( (x) => {
        x.company_id = x.entity_id;
        return x;
      })



      this.partnerCompanies = [].concat(this._selectedCompanies);
    }

    if (this._selectedInstitutes.length > 0) {

      

      this._selectedInstitutes.map( (x) => {
        x.institute_id = x.entity_id;
        return x;
      })


      this.partnerInstitutes = [].concat(this._selectedInstitutes);
    }
  }

  getInstituteBySearch() {
    return new Promise(async (resolve) => {
      const res = await this.companyApi.getCompanyPartners(
        this.shared.companyId,
        1,
        5000,
        "INSTITUTE"
      ) as any;
      
      resolve(res.data.response.company_partners);
    });
  }

  getCompanyPartnersSearch() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = await this.companyApi.getCompanyPartners(
        this.shared.companyId,
        1,
        5000,
        "COMPANY"
      ) as any;
      
      resolve(res.data.response.company_partners);
    });
  }

  show(tab) {
    this.selectedTab = tab;
  }

  async openSearch() {

    let nselected_data = [];
    if (this.selectedTab == "company") {
      nselected_data = this.partnerCompanies;
    } else if (this.selectedTab == "institution") {
      nselected_data = this.partnerInstitutes;
    }

    const res = await this.ccModalService.present(SearchPartnersComponent, {
      selectedTab: this.selectedTab,
      selected_data: nselected_data,
      placeholder: this.selectedTab == 'company' ? 'Search company' : 'Search institution'
    }, "modal-full-screen-view", "", "md");

    if (res.data?.selected.length !== 0) {
      const selected = res.data?.selected;
      if (res.data?.changed) {
        let array = [];
        this.canSubmit = true;
        selected.forEach((element) => {
          array.push(element);
        });
        if (this.selectedTab == "company") {
          this.partnerCompanies = array;
        } else if (this.selectedTab == "institution") {
          this.partnerInstitutes = array;
        }
        
        
      }
    }
  }

  dismiss() {
    this.ccModalService.dismiss();
  }

  save() {
    let companyId = this.shared.companyId;
    let addedInstitutes = [];
    if (this.partnerInstitutes.length > 0) {
      addedInstitutes = this.partnerInstitutes.map((x) => x.institute_id ? x.institute_id : x.entity_id);
    }
    let addedCompanyPartners = [];
    if (this.partnerCompanies.length > 0) {
      addedCompanyPartners = this.partnerCompanies.map((x) => x.company_id ? x.company_id : x.entity_id);
    }

    let data = {
      privacy_level: "PRIVATE",
      institute_partner_id: addedInstitutes,
      company_partner_id: addedCompanyPartners,
    };

    this.companyApi.updateCompanyPartners(companyId, data).then((res: any) => {
      
      if (res) {
        this.shared.companyDetailsChanged.next();
        this.ccModalService.dismiss();
      }
    });
  }

  updateInstitution($event){
    this.partnerInstitutes = $event;
    this.canSubmit = true;
  }

  updateCompany($event){
    this.partnerCompanies = $event;
    this.canSubmit = true;
  }

}
