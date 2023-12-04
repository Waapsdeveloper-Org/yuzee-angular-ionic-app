import { Component, OnInit } from '@angular/core';
import { GlobalSearchPeopleHelperService } from 'src/app/services/global-search/global-search-people-helper.service';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { searchPeopleFilterArray } from 'src/app/app.constants';

@Component({
  selector: 'app-searched-people',
  templateUrl: './searched-people.component.html',
  styleUrls: ['./searched-people.component.scss'],
})
export class SearchedPeopleComponent implements OnInit {
  filterArray = searchPeopleFilterArray;
  list = [];
  filterObj = {
    city_name: null,
    country_name: null,
    state_name: null,
    company_id: null,
    institute_id: null,
  };

  constructor(
    public gsHelper: GlobalSearchPeopleHelperService,
    public ngrx: NgrxService
  ) {}

  ngOnInit() {
    this.getPeopleWithFilters();
  }
  ionViewWillEnter() {
    this.getPeopleWithFilters();
  }

  getPeopleWithFilters() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = (await this.gsHelper.getPeopleWithFilters(
        this.filterObj
      )) as any[];

      const page = this.gsHelper.searchObject.page_number;
      if (page > 1) {
        this.list = [...this.list, ...data];
      } else {
        this.list = [...data];
      }

      this.ngrx.publish('global-search-people', this.list);
      resolve(data);
    });
  }
  openFilter($event) {
    const filter = $event;

    switch (filter.name) {
      case 'Location':
        this.processLocationFilter(filter);
        break;
      case 'Institution':
        this.processInstitutionFilter(filter);
        break;
      case 'Company':
        this.processCompanyFilter(filter);
        break;
    }
  }
  async processLocationFilter(filter) {
    const res = (await this.gsHelper.getLocation()) as any;
    if (res) {
      filter.active = true;
      this.filterObj.city_name = res.City;
      this.filterObj.country_name = res.Country;
      this.filterObj.state_name = res.State;
      this.getPeopleWithFilters();
    }
  }

  async processInstitutionFilter(filter) {
    const res = (await this.gsHelper.getInstituionList()) as any;
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.institute_id = res.length > 0 ? res.map((x) => x.institute_name).join() : null;

    const index = this.filterArray.findIndex(
      (x) => x.name === 'Institution'
    );

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getPeopleWithFilters();
  }
  async processCompanyFilter(filter) {
    const res = (await this.gsHelper.getCompanyList()) as any;
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.company_id =
      res.length > 0 ? res.map((x) => x.company_name).join() : null;

    const index = this.filterArray.findIndex(
      (x) => x.name === 'Company'
    );

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }
    
    this.getPeopleWithFilters();
  }

  async clearAll() {
    await this.gsHelper.clearAll();
    this.filterObj = {
      city_name: null,
      country_name: null,
      state_name: null,
      company_id: null,
      institute_id: null,
    };

    const aindex = this.filterArray.findIndex(
      (x) => x.name === 'Institution'
    );

    if (aindex !== -1) {
      this.filterArray[aindex].count = 0;
    }

    const bindex = this.filterArray.findIndex(
      (x) => x.name === 'Company'
    );

    if (bindex !== -1) {
      this.filterArray[bindex].count = 0;
    }

    this.filterArray = this.filterArray.map((x) => {
      x.active = false;
      return x;
    });

    this.getPeopleWithFilters();
  }

  async onIonInfinite($event) {
    this.gsHelper.searchObject.page_number += 1;
    await this.getPeopleWithFilters();
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }
}
