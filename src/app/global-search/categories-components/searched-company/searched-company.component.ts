import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { searchCompanyFilterArray } from 'src/app/app.constants';
import { LocationAutocompleteComponent } from 'src/app/shared';
import { GlobalSearchCompanyHelperService } from 'src/app/services/global-search/global-search-company-helper.service';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { CompanyHelperService } from 'src/app/services/company-helper.service';

@Component({
  selector: 'app-searched-company',
  templateUrl: './searched-company.component.html',
  styleUrls: ['./searched-company.component.scss'],
})
export class SearchedCompanyComponent implements OnInit {
  @Input() searchData;

  @ViewChild(IonContent) content: IonContent;
  AllCompanies: any = [];
  TotalCount: any;
  industryTypesResponse: any = [];
  selectedIndustryId;
  selectedCompanyId;
  industry: string = null;
  SelectedCategory: any;
  searchCompanyFilter = searchCompanyFilterArray;
  list = [];
  step = 1;
  filterObj = {
    city_name: null,
    country_name: null,
    search_keyword: null,
    state_name: null,
    company_name: null,
    type: null,
    industry: null,
  };
  type: any;

  constructor(
    public gsHelper: GlobalSearchCompanyHelperService,
    public ngrx: NgrxService,
    public ccHelperService: CompanyHelperService
    ) {}

  ngOnInit() {
    this.getCompanyWithFilters();
  }

  openFilter($event) {
    const filter = $event;
    switch (filter.name) {
      case 'Location':
        this.processLocationFilter(filter);
        break;
      case 'Type':
        this.processTypeFilter(filter);
        break;
      case 'Industry':
        this.processindustryFilter(filter);
        break;
    }
  }
  async processLocationFilter(filter) {
    const res = (await this.gsHelper.getLocation()) as any;

    if (res) {
      console.log("ressf")
      filter.active = true;
      this.filterObj.city_name = res.City;
      this.filterObj.country_name = res.Country;
      this.filterObj.state_name = res.State;
      this.getCompanyWithFilters();
    }else{
      filter.active = false;
      this.getCompanyWithFilters();
    }
  }

  getCompanyWithFilters() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = (await this.gsHelper.getCompanyWithFilters(
        this.filterObj
      )) as any[];

      const page = this.gsHelper.searchObject.page_number;
      if (page > 1) {
        this.list = [...this.list, ...data];
      } else {
        this.list = [...data];
      }

      this.ngrx.publish('global-search-company', this.list);
      resolve(data);
    });
  }
  async processTypeFilter(filter) {
    const selectedValue = null;
    const resType =
      (await this.ccHelperService.selectMultiCompanyType()) as any;
    // if (resType.data && resType.data.value) {
    //   this.type = resType.data.value.company_name;
    //   this.sharedService.createCompany.company_type = this.type;
    //   this.selectedCompanyId = resType.data.value.company_id;
    // }

    filter.active = resType.length > 0;

    this.gsHelper.searchObject.filters.selectedTypes = resType;
    this.filterObj.type =
      resType.length > 0 ? resType.map((x) => x.company_name).join() : null;

    const index = this.searchCompanyFilter.findIndex((x) => x.name === 'Type');

    if (index !== -1) {
      this.searchCompanyFilter[index].count = resType.length;
    }

    this.gsHelper.searchObject.page_number = 1;
    this.getCompanyWithFilters();
  }

  async processindustryFilter(filter) {
    const resIndustry =
      (await this.ccHelperService.selectIndustryMultipe()) as any;

    filter.active = resIndustry.length > 0;

    this.gsHelper.searchObject.filters.selectedIndustries = resIndustry;

    this.filterObj.industry =
      resIndustry.length > 0
        ? resIndustry.map((x) => x.industry_name).join()
        : null;

    const index = this.searchCompanyFilter.findIndex((x) => x.name === 'Industry');

    if (index !== -1) {
      this.searchCompanyFilter[index].count = resIndustry.length;
    }

    this.gsHelper.searchObject.page_number = 1;
    this.getCompanyWithFilters();
  }

  clearAll() {
    this.gsHelper.searchObject.page_number = 1;
    this.filterObj = {
      city_name: null,
      country_name: null,
      search_keyword: null,
      state_name: null,
      company_name: null,
      type: null,
      industry: null,
    };
    this.gsHelper.searchObject.filters.location.address = null;
    this.gsHelper.searchObject.filters.selectedTypes = [];
    this.gsHelper.searchObject.filters.selectedIndustries = [];

    this.ccHelperService.clearMultiSelectedCompanyTypes();
    this.ccHelperService.clearMultiSelectedCompanyindustry();

    const index = this.searchCompanyFilter.findIndex((x) => x.name === 'Type');

    if (index !== -1) {
      this.searchCompanyFilter[index].count = 0;
    }

    const bindex = this.searchCompanyFilter.findIndex(
      (x) => x.name === 'Industry'
    );

    if (index !== -1) {
      this.searchCompanyFilter[bindex].count = 0;
    }

    this.searchCompanyFilter = this.searchCompanyFilter.map((x) => {
      x.active = false;
      return x;
    });

    this.getCompanyWithFilters();
  }

  async detectBottom() {
    const scrollElement = await this.content.getScrollElement(); // get scroll element
    // calculate if max bottom was reached
    if (
      scrollElement.scrollTop ===
      scrollElement.scrollHeight - scrollElement.clientHeight
    ) {
      // will use a code here later
    }
  }

  async onIonInfinite($event) {
    this.gsHelper.searchObject.page_number += 1;
    await this.getCompanyWithFilters();
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }
}
