import { Component, OnInit } from '@angular/core';
import {
  searchEventsFilterArray,
} from 'src/app/app.constants';
import { CompanyHelperService } from 'src/app/services/company-helper.service';
import { GlobalSearchEventsHelperService } from 'src/app/services/global-search/global-search-events-helper.service';
import { NgrxService } from 'src/app/services/store/ngrx.service';

@Component({
  selector: "app-all-events",
  templateUrl: "./all-events.component.html",
  styleUrls: ["./all-events.component.scss"],
})
export class ALlEventsComponent implements OnInit {
  filterArray = searchEventsFilterArray;
  list = [];
  filterObj = {
    city_name: null,
    country_name: null,
    state_name: null,
    Day_type: null,
  };
  constructor(
  public ngrx: NgrxService,
    public gsHelper: GlobalSearchEventsHelperService,
    public ccHelperService: CompanyHelperService
  ) {}

  ngOnInit() {
    this.getEventWithFilters();
  }
  // ionViewWillEnter() {
  //   this.getEventWithFilters();
  // }

  getEventWithFilters() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = (await this.gsHelper.getEventWithFilters(
        this.filterObj
      )) as any[];
      
      
      const page = this.gsHelper.searchObject.page_number;
      if (page > 1) {
        this.list = [...this.list, ...data];
      } else {
        this.list = [...data];
      }

      this.ngrx.publish("global-search-events", this.list);
      resolve(data);
    });
  }

  openFilter($event) {
    const filter = $event;

    switch (filter.name) {
      case "Location":
        this.processLocationFilter(filter);
        break;
      case "Date":
        this.processDayFilter(filter);
        break;
      case "Categories":
        this.processCategoriesFilter(filter);
        break;
      case "Event Type":
        this.processEventTypeFilter(filter);
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
      this.getEventWithFilters();
    }
  }
  async processDayFilter(filter) {
    const res = (await this.gsHelper.getDayList()) as any;
    console.log("delivery data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.Day_type =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Delivery Type");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    // this.getCoursWithFilters();
  }
  async processCategoriesFilter(filter) {
    const res = await this.gsHelper.getCategoryList();
    console.log("cate Data data", res);
  }
  async processEventTypeFilter(filter) {
    const res = (await this.gsHelper.geteventTypeList()) as any;
    console.log("delivery data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.Day_type =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Delivery Type");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }
  }

  // clearAll() {
  //   this.gsHelper.searchObject.page_number = 1;
  //   this.filterObj = {
  //     city_name: null,
  //     country_name: null,
  //     state_name: null,
  //   };

  //   // this.getCompanyWithFilters();
  // }
}
