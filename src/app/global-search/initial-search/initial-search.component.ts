import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { NgrxService } from 'src/app/services/store/ngrx.service';

@Component({
  selector: "app-initial-search",
  templateUrl: "./initial-search.component.html",
  styleUrls: ["./initial-search.component.scss"],
})
export class InitialSearchComponent implements OnInit {
  SendGlobalData: any = {
    searchString: "",
    filters: {},
    rangeFilter: {},
    priceFilter: {},
  };
  companiesListObj = { list: [], totalCount: 0 };
  countFilterValue: number;
  showSearchCategoryList: boolean;
  SelectbuttonFilter: any;
  RecommendedViewCourse: boolean;
  RecommendedViewInstitution: boolean;
  RecommendedViewScholarship: boolean;
  SelectedTabIndex: string;
  IndexValueName: string;
  InnerFilterView: any;

  LevelSendSelected: any = [];
  CoursesArray: any = [];
  CountryArray: any = [];
  CityArray: any = [];
  ModeArray: any = [];
  DeliveryArray: any = [];
  FacultyArray: any = [];
  InstitutionArray: any = [];
  EventArray: any = [];
  ContentAuthorsValue: any = [];
  PriceActive: boolean = false;
  DurationActive: boolean = false;
  DateFilterApply: boolean = false;
  scholarshipDeadlineDate: boolean = false;
  JobLocationActive: boolean = false;
  JobContractActive: boolean = false;
  JobHoursActive: boolean = false;
  JobCategoryActive: boolean = false;
  Postvalue: boolean = false;
  Cost: any;
  Duration: any;
  youtubeDate: any = {};

  geoAddress: string;

  searchJobObj: any = {};
  SearchJobResultObj: any = {};
  SearchJobResult: any = [];
  jobsSort: any;
  jobsSalary: number = 0;
  jobsLocation: any = "";
  jobsCat: string = "";
  jobsHours: any = "";
  jobsContract: any = "";
  OfferArray: any[];
  JobtypeArray: any[];
  SchoolArray: any[];
  AchivementArray: any[];
  sendData: any = {};
  selectSkillList: any = [];
  statusValue: any = [];
  skillsArray: any;
  JobHourIsActive: boolean;
  Hours: any;
  ShowResult: any = false;
  categoriesList: any = [];
  MainDiv: boolean = false;
  @ViewChild("pageTop") pageTop: IonContent;
  SelectedCategory;
  FilterSelected: boolean = false;
  GlobalSearchedFilter: any = {
    location: 0,
    company: 0,
    institution: 0,
    campus: 0,
    type: 0,
    worldranking: 0,
    course: 0,
    faculty: 0,
    duration: 0,
    deliverymethod: 0,
    funding: 0,
    industry: 0,
    category: 0,
    jobtype: 0,
    salary: 0,
    schedule: 0,
    studylevel: 0,
    deadline: 0,
    country: 0,
    validity: 0,
    date: 0,
    eventType: 0,
    postedby: 0,
    authorindustry: 0,
  };

  constructor(private router: Router, public ngrx: NgrxService) {}

  ngOnInit() {}

  searchGlobalData(SearchData, empty) {
    console.log("SearchData", SearchData);
    console.log(empty);
    console.log(this.SelectbuttonFilter);
    if (SearchData.searchString == "") {
      this.showSearchCategoryList = false;
      this.ShowResult = false;
      this.SelectedCategory = localStorage.getItem("tabName");
    } else {
      this.showSearchCategoryList = true;
    }

    console.log(SearchData);
    localStorage.setItem("SearchData", SearchData.searchString);

    if (empty != null) {
      this.SelectbuttonFilter = "close";
      setTimeout(() => {
        this.SelectbuttonFilter = empty;
      }, 100);
      console.log(this.SelectbuttonFilter);
    }
  }

  getItems($event) {
    // this.getCompanyList();
    this.showSearchCategoryList = false;
    console.log(this.SendGlobalData.searchString.length);
    if (this.SendGlobalData.searchString.length >= 2) {
      this.router.navigateByUrl("/searchedList");
    } else {
    }
  }

  recentSearchData($event) {
    let item = $event;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.ngrx.publish("global-search-event:category", item);
  }

  readOutputValueEmitted($event){

  }
}
