import { Component, OnInit } from '@angular/core';
import {
  searchScholarshipFilterArray,
} from 'src/app/app.constants';
import { NgrxService } from 'src/app/services/store/ngrx.service';
import { GlobalSearchScholorshipHelperService } from 'src/app/services/global-search/global-search-scholorship-helper.service';

@Component({
  selector: "app-searched-scholarship",
  templateUrl: "./searched-scholarship.component.html",
  styleUrls: ["./searched-scholarship.component.scss"],
})
export class SearchedScholarshipComponent implements OnInit {
  filterArray = searchScholarshipFilterArray;
  list = [];
  filterObj = {
    study_Level: [],
    Deadline_type:null,
    city_name: null,
    Validity:null,
    state_name: null,
    course_id: null,
    country_name: null,
    institute_id: null,
    search_keyword: "",
    scholarship_types: [],
    industry: null,
  };
  constructor(
    public gsHelper: GlobalSearchScholorshipHelperService,
    public ngrx: NgrxService
  ) {}

  ngOnInit() {
    this.getScholarshipWithFilters();
  }
  ionViewWillEnter() {
    this.getScholarshipWithFilters();
  }
  getScholarshipWithFilters() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const data = (await this.gsHelper.getScholarshipWithFilters(
        this.filterObj
      )) as any[];
      const page = this.gsHelper.searchObject.page_number;
      if (page > 1) {
        this.list = [...this.list, ...data];
      } else {
        this.list = [...data];
      }

      this.ngrx.publish("global-search-scholarship", this.list);
      resolve(data);
    });
  }
  openFilter($event) {
    const filter = $event;

    switch (filter.name) {
      case "Location":
        this.processLocationFilter(filter);
        break;
      case "Study Level":
        this.processStudyLevelFilter(filter);
        break;
      case "Deadline":
        this.processDeadlineFilter(filter);
        break;
      case "Validity":
        this.processValidityFilter(filter);
        break;
      case "Institution":
        this.processInstitutionFilter(filter);
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
      this.getScholarshipWithFilters();
    }
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

    this.getScholarshipWithFilters();
  }

  async processDeadlineFilter(filter) {
    const res = (await this.gsHelper.getDeadlineTypeList()) as any;
    console.log("delivery data", res);
    filter.active = res.length > 0;
    filter.count = res.length;

    this.filterObj.Deadline_type =
      res.length > 0 ? res.map((x) => x.id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Deadline");

    if (index !== -1) {
      this.filterArray[index].count = res.length;
    }

    this.getScholarshipWithFilters();
  }
  async processValidityFilter(filter) {
    const res = (await this.gsHelper.getValidityList()) as any;
     filter.active = res.length > 0;

     this.filterObj.city_name =
       res.length > 0 ? res.map((x) => x.institute_id).join() : null;

     const index = this.filterArray.findIndex((x) => x.name === "Validity");

     if (index !== -1) {
       this.filterArray[index].count = this.filterObj.institute_id.length;
     }
     this.getScholarshipWithFilters();
  }
  async processInstitutionFilter(filter) {
    const res = (await this.gsHelper.getInstituionList()) as any;
    filter.active = res.length > 0;

    this.filterObj.institute_id =
      res.length > 0 ? res.map((x) => x.institute_id).join() : null;

    const index = this.filterArray.findIndex((x) => x.name === "Institution");

    if (index !== -1) {
      this.filterArray[index].count = this.filterObj.institute_id.length;
    }
    this.getScholarshipWithFilters();
  }

  async clearAll() {
    await this.gsHelper.clearAll();
    this.filterObj = {
      course_id: null,
      study_Level: [],
      Deadline_type: null,

      city_name: null,
      state_name: null,
      country_name: null,
      institute_id: null,
      search_keyword: "",
      scholarship_types: [],
      industry: null,
    };
    this.gsHelper.searchObject.filters.category.selected_list = [];

    const index = this.filterArray.findIndex((x) => x.name === "Study Level");
    if (index !== -1) {
      this.filterArray[index].count = 0;
    }

    const abindex = this.filterArray.findIndex((x) => x.name === "Validity");
    if (abindex !== -1) {
      this.filterArray[abindex].count = 0;
    }
    const abcindex = this.filterArray.findIndex(
      (x) => x.name === "Institution"
    );
    if (abcindex !== -1) {
      this.filterArray[abcindex].count = 0;
    }

    this.filterArray = this.filterArray.map((x) => {
      x.active = false;
      return x;
    });

    this.getScholarshipWithFilters();
  }

  async onIonInfinite($event) {
    this.gsHelper.searchObject.page_number += 1;
    await this.getScholarshipWithFilters();
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }
}
