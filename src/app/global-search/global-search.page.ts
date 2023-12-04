import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { GlobalCategories } from 'src/constants/global-categories';
import { ElasticSearchApiService, GlobalSearchApiServices } from 'yuzee-shared-lib';

import {
  IonContent,
  ModalController,
} from '@ionic/angular';

import { EventCategoryMultipleComponent } from '../events/event-category-multiple/event-category-multiple.component';
import { AnyDateDaysComponent } from '../shared/any-date-days/any-date-days.component';
import { AdvanceFilterComponent } from './';
import { CompanyComponent } from './landing-page-components/company/company.component';
import { IntitutionComponent } from './landing-page-components/intitution/intitution.component';
import { AuthorIndustriesFilterComponent } from './pop-ups/author-industries-filter/author-industries-filter.component';
import { CampusFilterComponent } from './pop-ups/campus-filter/campus-filter.component';
import { CategoryFilterComponent } from './pop-ups/category-filter/category-filter.component';
import { CountryFilterComponent } from './pop-ups/country-filter/country-filter.component';
import { CourseFilterComponent } from './pop-ups/course-filter/course-filter.component';
import { DateFilterComponent } from './pop-ups/date-filter/date-filter.component';
import { DeadlineFilterComponent } from './pop-ups/deadline-filter/deadline-filter.component';
import { DeliveryFilterComponent } from './pop-ups/delivery-filter/delivery-filter.component';
import { DurationFilterComponent } from './pop-ups/duration-filter/duration-filter.component';
import { FacultyFilterComponent } from './pop-ups/faculty-filter/faculty-filter.component';
import { FundingFilterComponent } from './pop-ups/funding-filter/funding-filter.component';
import { IndustryFilterComponent } from './pop-ups/industry-filter/industry-filter.component';
import { LocationFilterComponent } from './pop-ups/location-filter/location-filter.component';
import { MainCategoriesComponent } from './pop-ups/main-categories/main-categories.component';
import { OpenMapComponent } from './pop-ups/open-map/open-map.component';
import { PostedByFilterComponent } from './pop-ups/posted-by-filter/posted-by-filter.component';
import { PriceFilterComponent } from './pop-ups/price-filter/price-filter.component';
import { SalaryFilterComponent } from './pop-ups/salary-filter/salary-filter.component';
import { ScheduleFilterComponent } from './pop-ups/schedule-filter/schedule-filter.component';
import { StudyLevelFilterComponent } from './pop-ups/study-level-filter/study-level-filter.component';
import { TypeFilterComponent } from './pop-ups/type-filter/type-filter.component';
import { ValidityFilterComponent } from './pop-ups/validity-filter/validity-filter.component';
import { WorldRatingFilterComponent } from './pop-ups/world-rating-filter/world-rating-filter.component';
import { JobsSalaryComponent, JobsTypeComponent, JobsLocationSearchComponent } from '../jobs/shared';
import { NgrxService } from '../services/store/ngrx.service';
import { CompanyHelperService } from '../services/company-helper.service';

@Component({
  selector: "app-global-search",
  templateUrl: "./global-search.page.html",
  styleUrls: ["./global-search.page.scss"],
})
export class GlobalSearchPage implements OnInit {
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

  constructor(
    private router: Router,
    private globalSearchService: GlobalSearchApiServices,
    private elastic: ElasticSearchApiService,
    public location: Location,
    public modalCtrl: ModalController,
    public ngrx: NgrxService,
    public ccHelper: CompanyHelperService
  ) {
    this.ngrx.subscribe("global-search-event:category", (item) => {
      if (item.category == "Companies") {
        this.fetchCompaniesList();
      }
    });
  }

  ngOnInit() {
    this.SelectbuttonFilter = "Search";
    this.categoriesList = GlobalCategories.categories;
  }

  getItems(searchData) {
    this.router.navigateByUrl("/global-search/initial/searched-list");
    this.showSearchCategoryList = false;
    // if (searchData?.detail?.value?.length >= 2) {
    //   this.router.navigateByUrl("/global-search/searchedList");
    // } else {
    //   this.showSearchCategoryList = false;
    // }
  }

  getInstituteBySearch(name) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.elastic.getAllInstitutebyName(
        1,
        10,
        name
      )) as any;
      resolve(res.data.response);
    });
  }
  getsearchCourseByString(name) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const res = (await this.elastic.searchCourseInstituteId(
        "9d36d3d1-3558-4937-bd35-9db505166c3d",
        1,
        10
      )) as any;
      resolve(res.data.response);
    });
  }
  ShowSelectedFilter(value, stringSearch) {
    this.SelectbuttonFilter = value;
    this.SelectedTabIndex = " ";
    if (
      value == "content" ||
      value == "course" ||
      value == "institute" ||
      value == "videos" ||
      value == "scholarship" ||
      value == "events" ||
      value == "user" ||
      value == "jobs" ||
      value == "wikipedia"
    ) {
      this.SelectedTabIndex = value;
      if (value == "user") {
        this.searchGlobalData(this.SendGlobalData, null);
      } else if (value == "content") {
        this.searchGlobalData(this.SendGlobalData, null);
      } else if (value == "course") {
        if (this.SendGlobalData.searchString) {
          if (this.SendGlobalData.searchString != "") {
            this.searchGlobalData(this.SendGlobalData, null);
            this.countFilterValue = 1;
          }
        }
      } else if (value == "institute") {
        if (this.SendGlobalData.searchString) {
          if (this.SendGlobalData.searchString != "") {
            this.searchGlobalData(this.SendGlobalData, null);
            this.countFilterValue = 1;
          }
        }
      } else if (value == "videos") {
        this.searchGlobalData(this.SendGlobalData, null);
      } else if (value == "scholarship") {
        this.searchGlobalData(this.SendGlobalData, null);
      } else if (value == "wikipedia") {
      } else if (value == "jobs") {
        if (this.SendGlobalData.searchString) {
          if (this.SendGlobalData.searchString != "") {
            this.searchJobs(this.SendGlobalData.searchString);
          }
        }
      }
    }
  }

  // shaeeba work
  ShowCatDetail(value, stringSearch) {
    this.SelectbuttonFilter = value.tabName;
    this.SelectedTabIndex = "";
    this.MainDiv = true;
    this.SelectedTabIndex = value;
    localStorage.setItem("tabName", value.tabName);
    this.searchGlobalData(this.SendGlobalData, null);
    this.SelectedCategory = localStorage.getItem("tabName");
  }

  searchGlobalData(SearchData, empty) {
    if (SearchData.searchString == "") {
      this.showSearchCategoryList = false;
      this.ShowResult = false;
      this.SelectedCategory = localStorage.getItem("tabName");
    }
    localStorage.setItem("SearchData", SearchData.searchString);

    if (empty != null) {
      this.SelectbuttonFilter = "close";
      setTimeout(() => {
        this.SelectbuttonFilter = empty;
      }, 100);
    }
  }

  readOutputValueEmitted(blueprintData) {
    this.countFilterValue = 1;
    this.showSearchCategoryList = false;
    this.SelectbuttonFilter = blueprintData.selectCategoryTab;
    this.ShowResult = blueprintData.ShowResult;
    this.SelectedCategory = localStorage.getItem("");
    if (this.SelectbuttonFilter != "") {
      this.ShowCatDetail(this.SelectbuttonFilter, null);
    }
    this.pageTop.scrollToTop();
  }

  showSelectedInnerFilter(value) {
    this.InnerFilterView = value;
    if (this.InnerFilterView == "Postedby") {
      this.openAuthorList();
    } else if (this.InnerFilterView == "Dateposted") {
      this.openDatePosted();
    } else if (this.InnerFilterView == "Level") {
      this.openLevels();
    } else if (this.InnerFilterView == "CourseFilter") {
      this.openCoursesFilter();
    } else if (this.InnerFilterView == "Faculty") {
      this.openFaculties();
    } else if (this.InnerFilterView == "Country") {
      this.openCountryModal();
    } else if (this.InnerFilterView == "City") {
      this.openCityModal();
    } else if (this.InnerFilterView == "Price") {
      this.openPriceModal();
    } else if (this.InnerFilterView == "Duration") {
      this.openDurationModal();
    } else if (this.InnerFilterView == "Mode") {
      this.openModeModal();
    } else if (this.InnerFilterView == "Delivery") {
      this.openDeliveryModal();
    } else if (this.InnerFilterView == "Institution") {
      this.openInstitutionList();
    } else if (this.InnerFilterView == "VideosDate") {
      this.openDateAscDsc();
    } else if (this.InnerFilterView == "Intake") {
      this.openSchlDeadline();
    } else if (this.InnerFilterView == "EventAnyDate") {
      this.openEventAnyDate();
    } else if (this.InnerFilterView == "EventCategory") {
      this.openEventCategory();
    } else if (this.InnerFilterView == "Sallery") {
      this.openSallery();
    } else if (this.InnerFilterView == "Contract") {
      this.openContract();
    } else if (this.InnerFilterView == "Sort") {
      this.openSort();
    } else if (this.InnerFilterView == "JobCategory") {
      this.openCategory();
    } else if (this.InnerFilterView == "JobLocation") {
      this.openJobLocation();
    } else if (this.InnerFilterView == "Schools") {
      this.openFilterSchool();
    } else if (this.InnerFilterView == "Achivements") {
      this.openFilterAchivements();
    } else if (this.InnerFilterView == "Age") {
      this.openFilterAge();
    } else if (this.InnerFilterView == "GPA") {
      this.openFiltergpa();
    } else if (this.InnerFilterView == "IELTS") {
      this.openFilterIelts();
    } else if (this.InnerFilterView == "Offers") {
      this.openFilterOffer();
    } else if (this.InnerFilterView == "JobType") {
      this.openFilterJobType();
    } else if (this.InnerFilterView == "Status") {
      this.openFilterStatus();
    } else if (this.InnerFilterView == "Skills") {
      this.openSkillList();
    } else if (this.InnerFilterView == "AuthorIndustries") {
      this.openFilterAuthorIndustries();
    } else if (this.InnerFilterView == "Hours") {
      this.jobHoursIs();
    }
  }

  async jobHoursIs() {
    const modal = await this.modalCtrl.create({
      component: "HoursOfJobComponent",
      componentProps: { paramsJobCat: this.Hours },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsCat = dataReturned.data.tag;
          this.searchJobs(this.SendGlobalData.searchString);
          this.JobHourIsActive = true;
        }
      }
    });
    return await modal.present();
  }

  async openFilterAuthorIndustries() {
    const modal = await this.modalCtrl.create({
      component: "AuthorIndustriesComponent",
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
        }
      }
    });
    return await modal.present();
  }

  async openFilterStatus() {
    const modal = await this.modalCtrl.create({
      component: "StatusOnlineOfflineComponent",
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.statusValue = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openSkillList() {
    const modal = await this.modalCtrl.create({
      component: "ContentAuthorListComponent",
      componentProps: { Skills: this.selectSkillList },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          // this.ContentAuthorsValue = dataReturned.data
        }
      }
    });
    return await modal.present();
  }

  async openFilterSkills() {
    const modal = await this.modalCtrl.create({
      component: "SkillsSearchListComponent",
      componentProps: { Skills: this.skillsArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.skillsArray = [];
          this.skillsArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openAuthorList() {
    const modal = await this.modalCtrl.create({
      component: "ContentAuthorListComponent",
      componentProps: { Authors: this.ContentAuthorsValue },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.ContentAuthorsValue = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openDatePosted() {
    const modal = await this.modalCtrl.create({
      component: "DateOrdersComponent",
      componentProps: { Authors: this.ContentAuthorsValue },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
        }
      }
    });
    return await modal.present();
  }

  async openLevels() {
    const modal = await this.modalCtrl.create({
      component: "LevelListMultipleComponent",
      componentProps: { FiltersLevels: this.LevelSendSelected },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.LevelSendSelected = [];
          this.LevelSendSelected = dataReturned.data;
          this.SendGlobalData.filters.level_Code = Array.prototype.map.call(
            this.LevelSendSelected,
            (levels) => levels.code
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;

          if (this.SendGlobalData.filterDates) {
            this.countFilterValue = this.countFilterValue + 1;
          }
        }
      }
    });
    return await modal.present();
  }

  async openCoursesFilter() {
    const modal = await this.modalCtrl.create({
      component: "CourseSearchMultipleComponent",
      componentProps: { Courses: this.CoursesArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.CoursesArray = [];
          this.CoursesArray = dataReturned.data;
          this.SendGlobalData.filters.name = Array.prototype.map.call(
            this.CoursesArray,
            (course) => course.name
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
        }
      }
    });
    return await modal.present();
  }

  async openFaculties() {
    const modal = await this.modalCtrl.create({
      component: "FacultyListMultipleComponent",
      componentProps: { Faculties: this.FacultyArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.FacultyArray = [];
          this.FacultyArray = dataReturned.data;
          this.SendGlobalData.filters.faculty_name = Array.prototype.map.call(
            this.FacultyArray,
            (faculty) => faculty.name
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
        }
      }
    });
    return await modal.present();
  }

  async openCountryModal() {
    const modal = await this.modalCtrl.create({
      component: "CountrySearchMultipleComponent",
      componentProps: { Countries: this.CountryArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.CountryArray = [];
          this.CountryArray = dataReturned.data;
          this.SendGlobalData.filters.country_name = Array.prototype.map.call(
            this.CountryArray,
            (country) => country.name
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
          if (this.SendGlobalData.filterDates) {
            let keys = Object.keys(this.SendGlobalData.filterDates);
            this.countFilterValue = this.countFilterValue + 1;
          }
        }
      }
    });
    return await modal.present();
  }

  async openCityModal() {
    const modal = await this.modalCtrl.create({
      component: "CitySearchMultipleComponent",
      componentProps: { Cities: this.CityArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.CityArray = dataReturned.data;
          this.SendGlobalData.filters.city_name = Array.prototype.map.call(
            this.CityArray,
            (city) => city.name
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
        }
      }
    });
    return await modal.present();
  }

  async openPriceModal() {
    const modal = await this.modalCtrl.create({
      component: "PriceRangeComponent",
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.Cost = dataReturned.data;
          this.PriceActive = true;
          this.SendGlobalData.priceFilter.price = [
            this.Cost.lower,
            this.Cost.upper,
          ];
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
        }
      }
    });
    return await modal.present();
  }

  async openDurationModal() {
    const modal = await this.modalCtrl.create({
      component: "DurationYearRangeComponent",
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.Duration = dataReturned.data;
          this.DurationActive = true;
          this.SendGlobalData.rangeFilter.duration = [
            this.Duration.lower,
            this.Duration.upper,
          ];
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.rangeFilter);
        }
      }
    });
    return await modal.present();
  }

  async openModeModal() {
    const modal = await this.modalCtrl.create({
      component: "ModeMultipleComponent",
      componentProps: { Modes: this.ModeArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.ModeArray = [];
          this.ModeArray = dataReturned.data;
          this.SendGlobalData.filters.part_full = Array.prototype.map.call(
            this.ModeArray,
            (mode) => mode.name
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
        }
      }
    });
    return await modal.present();
  }

  async openDeliveryModal() {
    const modal = await this.modalCtrl.create({
      component: "DeliveryMultipleComponent",
      componentProps: { Delivery: this.DeliveryArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.DeliveryArray = [];
          this.DeliveryArray = dataReturned.data;
          this.SendGlobalData.filters.delivery_mode = Array.prototype.map.call(
            this.DeliveryArray,
            (delevery) => delevery.name
          );
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
          // this.filterApi('DeliveryFilter')
        }
      }
    });
    return await modal.present();
  }

  async openInstitutionList() {
    const modal = await this.modalCtrl.create({
      component: "InstitutionListMultipleComponent",
      componentProps: { InstitutionParms: this.InstitutionArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.InstitutionArray = [];
          this.InstitutionArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openDateAscDsc() {
    const modal = await this.modalCtrl.create({
      component: "DateAscDescComponent",
      componentProps: { paramsDate: this.youtubeDate.value },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.DateFilterApply = true;
          this.youtubeDate.value = dataReturned.data.value;
        }
      }
    });
    return await modal.present();
  }

  async openSchlDeadline() {
    const modal = await this.modalCtrl.create({
      component: "DeadlineMonthYearComponent",
      componentProps: { Deadline: this.scholarshipDeadlineDate },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.scholarshipDeadlineDate = dataReturned.data;
          this.SendGlobalData.filterDates = {
            applicationDeadline: [
              this.scholarshipDeadlineDate,
              new Date().toISOString(),
            ],
          };
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          let keys = Object.keys(this.SendGlobalData.filters);
          this.countFilterValue = keys.length + 1;
          this.countFilterValue = this.countFilterValue + 1;
        }
      }
    });
    return await modal.present();
  }

  async openEventAnyDate() {
    const modal = await this.modalCtrl.create({
      component: AnyDateDaysComponent,
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
        }
      }
    });
    return await modal.present();
  }

  async openEventCategory() {
    const modal = await this.modalCtrl.create({
      component: EventCategoryMultipleComponent,
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.EventArray = [];
          this.EventArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openFilterOffer() {
    const modal = await this.modalCtrl.create({
      component: "OffersComponent",
      componentProps: { Offer: this.OfferArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.OfferArray = [];
          this.OfferArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openFilterJobType() {
    const modal = await this.modalCtrl.create({
      component: "JobTypeComponent",
      componentProps: { Joptype: this.JobtypeArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.JobtypeArray = [];
          this.JobtypeArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openFilterSchool() {
    const modal = await this.modalCtrl.create({
      component: "SchoolsComponent",
      componentProps: { School: this.SchoolArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.SchoolArray = [];
          this.SchoolArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }
  async openFilterAchivements() {
    const modal = await this.modalCtrl.create({
      component: "AchivementComponent",
      componentProps: { Achivements: this.AchivementArray },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.AchivementArray = [];
          this.AchivementArray = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openFilterAge() {
    const modal = await this.modalCtrl.create({ component: "StuAgeComponent" });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.Cost = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openFiltergpa() {
    const modal = await this.modalCtrl.create({ component: "GpaComponent" });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.Cost = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openFilterIelts() {
    const modal = await this.modalCtrl.create({ component: "IeltsComponent" });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.Cost = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openSallery() {
    const modal = await this.modalCtrl.create({
      component: JobsSalaryComponent,
      componentProps: { paramsSalary: this.jobsSalary },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsSalary = dataReturned.data;
          this.searchJobs(this.SendGlobalData.searchString);
        }
      }
    });
    return await modal.present();
  }

  async openContract() {
    const modal = await this.modalCtrl.create({
      component: JobsTypeComponent,
      componentProps: { paramsContract: this.jobsContract },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsContract = dataReturned.data.sendValue;
          this.searchJobs(this.SendGlobalData.searchString);
          this.JobContractActive = true;
        }
      }
    });
    return await modal.present();
  }

  async openHours() {
    const modal = await this.modalCtrl.create({
      component: JobsSalaryComponent,
      componentProps: { paramsHours: this.jobsHours },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsHours = dataReturned.data.sendValue;
          this.searchJobs(this.SendGlobalData.searchString);
          this.JobHoursActive = true;
        }
      }
    });
    return await modal.present();
  }

  async openSort() {
    const modal = await this.modalCtrl.create({
      component: "JobsSortingComponent",
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsSort = dataReturned.data;
        }
      }
    });
    return await modal.present();
  }

  async openCategory() {
    const modal = await this.modalCtrl.create({
      component: "JobsCategoryComponent",
      componentProps: { paramsJobCat: this.jobsCat },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsCat = dataReturned.data.tag;
          this.searchJobs(this.SendGlobalData.searchString);
          this.JobCategoryActive = true;
        }
      }
    });
    return await modal.present();
  }

  async openJobLocation() {
    const modal = await this.modalCtrl.create({
      component: JobsLocationSearchComponent,
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.jobsLocation = dataReturned.data.City;
          this.searchJobs(this.SendGlobalData.searchString);
          this.JobLocationActive = true;
        }
      }
    });
    return await modal.present();
  }

  async openAdvanceFilter() {
    const modal = await this.modalCtrl.create({
      component: AdvanceFilterComponent,
      componentProps: {
        advanceFilter: this.SendGlobalData,
        selectedTab: this.SelectbuttonFilter,
        whichPage: "GSP",
      },
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != undefined) {
          this.SendGlobalData = dataReturned.data.searchData;
          this.CountryArray = dataReturned.data.CountryArray;
          this.CityArray = dataReturned.data.CityArray;
          this.countFilterValue = dataReturned.data.countFilterValue;
          this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
          if (this.SelectbuttonFilter == "course") {
            this.LevelSendSelected = dataReturned.data.LevelSendSelected;
            this.CoursesArray = dataReturned.data.CoursesArray;
            this.FacultyArray = dataReturned.data.FacultyArray;
            this.ModeArray = dataReturned.data.ModeArray;
            this.DeliveryArray = dataReturned.data.DeliveryArray;
            if (dataReturned.data.priceFilter) {
              this.PriceActive = true;
            } else if (dataReturned.data.rangeFilter) {
              this.DurationActive = true;
            }
          } else if (this.SelectbuttonFilter == "scholarship") {
            this.LevelSendSelected = dataReturned.data.LevelSendSelected;
          }
        }
      }
    });
    return await modal.present();
  }

  searchJobFiltersData(SearchData, empty) {
    this.showSearchCategoryList = false;
    if (empty != null) {
      this.SelectbuttonFilter = "close";
      setTimeout(() => {
        this.SelectbuttonFilter = empty;
      }, 100);
    }
  }

  searchJobs(searchQuery) {
    if (searchQuery != "") {
      this.searchJobObj.pagesize = 20;
      this.searchJobObj.what = searchQuery;
      this.searchJobObj.what_exclude = "";
      this.searchJobObj.where = this.jobsLocation;
      this.searchJobObj.sort_by = "salary";
      this.searchJobObj.salary = this.jobsSalary;
      this.searchJobObj.mode = this.jobsHours;
      this.searchJobObj.type = this.jobsContract;
      this.searchJobObj.category = this.jobsCat;
      this.searchJobFiltersData(this.searchJobObj, "jobs");
    } else {
      alert("Please Search Keyword required");
    }
  }

  Reset() {
    this.SelectedTabIndex = "";
    this.SelectbuttonFilter = "Search";
    this.ContentAuthorsValue = [];
    this.LevelSendSelected = [];
    this.CoursesArray = [];
    this.CityArray = [];
    this.CountryArray = [];
    this.FacultyArray = [];
    this.ModeArray = [];
    this.DeliveryArray = [];
    this.InstitutionArray = [];
    this.DateFilterApply = false;
    this.countFilterValue = 0;
    this.DurationActive = false;
    this.scholarshipDeadlineDate = false;
    this.PriceActive = false;
    this.InnerFilterView = "close";
    this.SendGlobalData.filters = {};
    this.SendGlobalData.rangeFilter = {};
    this.SendGlobalData.priceFilter = {};
  }

  goBack() {
    this.location.back();
  }

  recentSearchOutputEmitted(data) {
    this.countFilterValue = 1;
    this.showSearchCategoryList = false;
    this.SelectbuttonFilter = data.category;
    this.SendGlobalData = data.search_history;
    this.searchGlobalData(this.SendGlobalData, this.SelectbuttonFilter);
  }

  async OpenModel() {
    const presentModel = await this.modalCtrl.create({
      component: MainCategoriesComponent,
      componentProps: {
        title: "Billing Address",
        type: "billing",
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: "change-categories-modal",
    });

    presentModel.onWillDismiss().then((data) => {
      this.SelectedCategory = localStorage.getItem("tabName");
    });

    return await presentModel.present();
  }

  async OpenMap() {
    const presentModel = await this.modalCtrl.create({
      component: OpenMapComponent,
      showBackdrop: true,
      mode: "ios",
    });

    presentModel.onWillDismiss().then((data) => {
      this.SelectedCategory = localStorage.getItem("tabName");
    });

    return await presentModel.present();
  }

  async openFilterPage(pagename) {
    if (pagename == "location") {
      const presentModel = await this.modalCtrl.create({
        component: LocationFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {
        console.log("dataa",data);
      });

      return await presentModel.present();
    } else if (pagename == "Company") {
      const presentModel = await this.modalCtrl.create({
        component: CompanyComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Institution") {
      const presentModel = await this.modalCtrl.create({
        component: IntitutionComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Date") {
      const presentModel = await this.modalCtrl.create({
        component: DateFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Course") {
      const presentModel = await this.modalCtrl.create({
        component: CourseFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Faculty") {
      const presentModel = await this.modalCtrl.create({
        component: FacultyFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Duration") {
      const presentModel = await this.modalCtrl.create({
        component: DurationFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Delivery") {
      const presentModel = await this.modalCtrl.create({
        component: DeliveryFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Funding") {
      const presentModel = await this.modalCtrl.create({
        component: FundingFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Price") {
      const presentModel = await this.modalCtrl.create({
        component: PriceFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "SLevel") {
      const presentModel = await this.modalCtrl.create({
        component: StudyLevelFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "SType") {
      const presentModel = await this.modalCtrl.create({
        component: TypeFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Type") {
      const presentModel = await this.modalCtrl.create({
        component: TypeFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Category") {
      const presentModel = await this.modalCtrl.create({
        component: CategoryFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Campus") {
      const presentModel = await this.modalCtrl.create({
        component: CampusFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Salary") {
      const presentModel = await this.modalCtrl.create({
        component: SalaryFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Schedule") {
      const presentModel = await this.modalCtrl.create({
        component: ScheduleFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Ranking") {
      const presentModel = await this.modalCtrl.create({
        component: WorldRatingFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Deadline") {
      const presentModel = await this.modalCtrl.create({
        component: DeadlineFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Country") {
      const presentModel = await this.modalCtrl.create({
        component: CountryFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Validity") {
      const presentModel = await this.modalCtrl.create({
        component: ValidityFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Industry") {
      const presentModel = await this.modalCtrl.create({
        component: IndustryFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Posted") {
      const presentModel = await this.modalCtrl.create({
        component: PostedByFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == "Author") {
      const presentModel = await this.modalCtrl.create({
        component: AuthorIndustriesFilterComponent,
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    }
  }

  fetchCompaniesList() {
    this.ccHelper.searchCompanyByName();
  }

  clearSearch($event) {}
}
