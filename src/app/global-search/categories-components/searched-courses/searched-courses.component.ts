import { Component, OnInit } from '@angular/core';
import {
  searchCourseFilterArray,
} from 'src/app/app.constants';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { GlobalSearchCourseHelperService } from 'src/app/services/global-search/global-search-course-helper.service';

@Component({
  selector: "app-searched-courses",
  templateUrl: "./searched-courses.component.html",
  styleUrls: ["./searched-courses.component.scss"],
})
export class SearchedCoursesComponent implements OnInit {
  filterArray = searchCourseFilterArray;
  list = [];

  filterObj = {
    city_name: null,
    country_name: null,
    state_name: null,
    company_id: null,
    institute_id: null,
    course_id: null,
    min_pricing: null,
    max_pricing: null,
    min_duration: null,
    max_duration: null,
    delivery_type: null,
    StudyLevel_type: null,
  };

  constructor(
    public gsHelper: GlobalSearchCourseHelperService,
    public ngrx: NgrxService
  ) {}

  ngOnInit() {
    this.getCoursWithFilters();
  }
  ionViewWillEnter() {
    this.getCoursWithFilters();
  }

  getCoursWithFilters() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = (await this.gsHelper.getCoursWithFilters(
        this.filterObj
      )) as any[];
      const page = this.gsHelper.searchObject.page_number;
      if (page > 1) {
        this.list = [...this.list, ...data];
      } else {
        this.list = [...data];
      }

      this.ngrx.publish("global-search-courses", this.list);
      resolve(data);
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async openFilter($event) {
    const filter = $event;

    switch (filter.name) {
      case "Location":
        this.processLocationFilter(filter);
        break;
      case "Course":
        this.processCourseFilter(filter);
        break;
      case "Delivery Type":
        this.processDeliveryFilter(filter);
        break;
      case "Study Type":
        this.processStudyFilter(filter);
        break;
      case "Company":
        this.processCompanyFilter(filter);
        break;
      case "Duration":
        this.processDurationFilter(filter);
        break;
      case "Faculty":
        this.processFacultyFilter(filter);
        break;
      case "Study Level":
        this.processStudyLevelFilter(filter);
        break;
      case "Funding":
        this.processFundingFilter(filter);
        break;
      case "Price":
        this.processPriceFilter(filter);
        break;
    }
  }

  async processLocationFilter(filter) {
    const res = (await this.gsHelper.getLocation()) as any;
    if (res) {
      filter.active = true;
      this.filterObj.city_name = res.city;
      this.filterObj.country_name = res.Country;
      this.filterObj.state_name = res.State;
      this.getCoursWithFilters();
    }
  }

  async processCourseFilter(filter) {
    const res = (await this.gsHelper.getCourseList()) as any;
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.course_id =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Course");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getCoursWithFilters();
  }
  async processCompanyFilter(filter) {
    const res = (await this.gsHelper.getCompanyList()) as any;
    console.log("Course data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.company_id =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Company");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getCoursWithFilters();
  }
  async processDeliveryFilter(filter) {
    const res = (await this.gsHelper.getDeliveryTypeList()) as any;
    console.log("delivery data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.delivery_type =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Delivery Type");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getCoursWithFilters();
  }
  async processStudyFilter(filter) {
    const res = (await this.gsHelper.getStudyTypeList()) as any;
    console.log("study data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.StudyLevel_type =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Study Type");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getCoursWithFilters();
  }

  async processStudyLevelFilter(filter) {
    const res = (await this.gsHelper.getStudyList()) as any;
    console.log("Study Level", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.course_id =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Study level");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getCoursWithFilters();
  }

  async processDurationFilter(filter) {
    const res = (await this.gsHelper.getDuration()) as any;
    filter.active = res.selected_max_value != null;
    this.filterObj.min_duration = res.selected_min_value;
    this.filterObj.max_duration = res.selected_max_value;
    this.getCoursWithFilters();
  }
  async processFacultyFilter(filter) {
    const res = (await this.gsHelper.getFacultyList()) as any;
    console.log("faculty data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.course_id =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Faculty");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getCoursWithFilters();
  }

  async processFundingFilter(filter) {
    const res = await this.gsHelper.getFundingList();
    console.log("Funding data", res);
  }

  async processPriceFilter(filter) {
    const res = (await this.gsHelper.getPricing()) as any;
    filter.active = res.selected_max_value != null;
    this.filterObj.min_pricing = res.selected_min_value;
    this.filterObj.max_pricing = res.selected_max_value;
    this.getCoursWithFilters();
  }

  async clearAll() {
    await this.gsHelper.clearAll();
    this.filterObj = {
      city_name: null,
      country_name: null,
      state_name: null,
      company_id: null,
      institute_id: null,
      course_id: null,
      min_pricing: null,
      max_pricing: null,
      min_duration: null,
      max_duration: null,
      delivery_type: null,
      StudyLevel_type: null,
    };

    this.filterArray = this.filterArray.map((x) => {
      x.active = false;
      return x;
    });

    this.getCoursWithFilters();
  }

  async onIonInfinite($event) {
    this.gsHelper.searchObject.page_number += 1;
    await this.getCoursWithFilters();
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }
}
