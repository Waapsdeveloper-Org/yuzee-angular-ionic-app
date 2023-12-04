import { Component, OnInit } from '@angular/core';

import { JobsApiService } from 'yuzee-shared-lib';

import { ModalController } from '@ionic/angular';

import { AuthorIndustriesFilterComponent } from '../../pop-ups/author-industries-filter/author-industries-filter.component';
import { CampusFilterComponent } from '../../pop-ups/campus-filter/campus-filter.component';

import { CountryFilterComponent } from '../../pop-ups/country-filter/country-filter.component';
import { CourseFilterComponent } from '../../pop-ups/course-filter/course-filter.component';
import { DateFilterComponent } from '../../pop-ups/date-filter/date-filter.component';
import { DeadlineFilterComponent } from '../../pop-ups/deadline-filter/deadline-filter.component';
import { DeliveryFilterComponent } from '../../pop-ups/delivery-filter/delivery-filter.component';
import { DurationFilterComponent } from '../../pop-ups/duration-filter/duration-filter.component';
import { FacultyFilterComponent } from '../../pop-ups/faculty-filter/faculty-filter.component';
import { FundingFilterComponent } from '../../pop-ups/funding-filter/funding-filter.component';
import { IndustryFilterComponent } from '../../pop-ups/industry-filter/industry-filter.component';

import { JobInfoComponent } from '../../pop-ups/job-info/job-info.component';

import { PostedByFilterComponent } from '../../pop-ups/posted-by-filter/posted-by-filter.component';
import { PriceFilterComponent } from '../../pop-ups/price-filter/price-filter.component';
import { SalaryFilterComponent } from '../../pop-ups/salary-filter/salary-filter.component';
import { ScheduleFilterComponent } from '../../pop-ups/schedule-filter/schedule-filter.component';
import { StudyLevelFilterComponent } from '../../pop-ups/study-level-filter/study-level-filter.component';
import { TypeFilterComponent } from '../../pop-ups/type-filter/type-filter.component';
import { ValidityFilterComponent } from '../../pop-ups/validity-filter/validity-filter.component';
import { WorldRatingFilterComponent } from '../../pop-ups/world-rating-filter/world-rating-filter.component';

import {
  FACULTYLIST,
  careerCategory,
  companyList,
  searchJobsFilterArray,
  workPlaceType,
} from 'src/app/app.constants';
import { CcModalService } from 'src/app/services/cc-modal.service';
import {
  JobDetailsComponent,
  LocationAutocompleteComponent,
} from 'src/app/shared';
import { ListModalService } from 'src/app/services/listModal.service';

@Component({
  selector: 'app-searched-jobs',
  templateUrl: './searched-jobs.component.html',
  styleUrls: ['./searched-jobs.component.scss'],
})
export class SearchedJobsComponent implements OnInit {
  moreTags: boolean = false;
  SelectedCategory: any;
  totalCount = 0;
  page: number = 1;
  filterValues: any;
  jobsList: any = [];
  apiCalled = false;
  totalPages: number;
  jobsResObj: any = {};
  searchJobsFilter = searchJobsFilterArray;
  constructor(
    public modalCtrl: ModalController,
    private JobsService: JobsApiService,
    private ccModalService: CcModalService,
    private listModalService: ListModalService
  ) {}

  ngOnInit() {
    localStorage.setItem('tabName', 'jobs');
    this.SelectedCategory = localStorage.getItem('tabName');
    this.pagination(this.page);
  }

  pagination(page) {
    if (page == 1) {
      this.jobsList = [];
    }

    this.apiCalled = true;
    this.JobsService.getJobListingForApplicant(page, 10)
      .then(
        (d: {
          data: {
            has_next_page?: boolean;
            has_previous_page?: boolean;
            response: any[];
            page_number?: number;
            total_count?: number;
            total_pages?: number;
          };
        }) => {
          this.jobsResObj = d.data;
          this.apiCalled = false;
          this.totalCount = d.data.total_count;
          this.page = d.data.page_number;
          this.totalPages = d.data.total_pages;
          d.data.response.forEach((res) => {
            this.jobsList.push(res);
          });
        }
      )
      .catch((e) => {
        this.jobsList = [];
        this.apiCalled = false;
        this.totalCount = 0;
        this.page = page;
      });
  }

  ShowMoreTags() {
    this.moreTags = true;
  }

  async openJobDetail() {
    const presentModel = await this.modalCtrl.create({
      component: JobInfoComponent,
      showBackdrop: true,
      mode: 'ios',
    });

    presentModel.onWillDismiss().then((data) => {});

    return await presentModel.present();
  }

  async openJobDetails(jobs) {
    const res = await this.ccModalService.present(
      JobDetailsComponent,
      { jobInfo: jobs },
      'modal-full-screen-view',
      'right',
      'md'
    );
    if (res) {
    }
  }

  async openFilterPage(pagename) {
    if (pagename.name == 'Location') {
      const res = await this.ccModalService.present(
        LocationAutocompleteComponent,
        {},
        'modal-full-screen-view',
        '',
        'md'
      );
      if (res) {
        pagename.active = true;
      }
    } else if (pagename.name == 'Company') {
      let modal = await this.listModalService.multiWithoutSearch(
        pagename.name,
        companyList,
        'name',
        'generic-medium-popup-modal generic-modal generic-model-backdrops'
      );
      if (modal.data != undefined) {
        pagename.active = true;
      }
    } else if (pagename.name == 'Category') {
      let modal = await this.listModalService.multiWithoutSearch(
        pagename.name,
        FACULTYLIST,
        'name',
        'generic-medium-popup-modal generic-modal generic-model-backdrops'
      );
      if (modal.data != undefined) {
        pagename.active = true;
      }
    } else if (pagename == 'Date') {
      const presentModel = await this.modalCtrl.create({
        component: DateFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Course') {
      const presentModel = await this.modalCtrl.create({
        component: CourseFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Faculty') {
      const presentModel = await this.modalCtrl.create({
        component: FacultyFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Duration') {
      const presentModel = await this.modalCtrl.create({
        component: DurationFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Delivery') {
      const presentModel = await this.modalCtrl.create({
        component: DeliveryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Funding') {
      const presentModel = await this.modalCtrl.create({
        component: FundingFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename.name == 'Salary') {
      const res = await this.ccModalService.present(
        PriceFilterComponent,
        { title: 'Salary' },
        'generic-medium-popup-modal generic-modal generic-model-backdrops',
        '',
        'ios'
      );
      if (res && res != undefined) {
        pagename.active = true;
      }
    } else if (pagename == 'SLevel') {
      const presentModel = await this.modalCtrl.create({
        component: StudyLevelFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'SType') {
      const presentModel = await this.modalCtrl.create({
        component: TypeFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename.name == 'Job Type') {
      let modal = await this.listModalService.multiWithoutSearch(
        pagename.name,
        careerCategory,
        'name',
        'generic-medium-popup-modal generic-modal generic-model-backdrops'
      );
      if (modal.data != undefined) {
        pagename.active = true;
      }
    } else if (pagename.name == 'Workplace Type') {
      const res = await this.listModalService.present(
        pagename.name,
        workPlaceType,
        'name',
        'generic-small-medium-popup-modal-collection generic-modal generic-model-backdrops',
        '',
        false,
        false,
        '',
        null
      );
      if (res && res != undefined) {
        pagename.active = true;
      }
    } else if (pagename == 'Campus') {
      const presentModel = await this.modalCtrl.create({
        component: CampusFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Salary') {
      const presentModel = await this.modalCtrl.create({
        component: SalaryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Schedule') {
      const presentModel = await this.modalCtrl.create({
        component: ScheduleFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Ranking') {
      const presentModel = await this.modalCtrl.create({
        component: WorldRatingFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Deadline') {
      const presentModel = await this.modalCtrl.create({
        component: DeadlineFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Country') {
      const presentModel = await this.modalCtrl.create({
        component: CountryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Validity') {
      const presentModel = await this.modalCtrl.create({
        component: ValidityFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Industry') {
      const presentModel = await this.modalCtrl.create({
        component: IndustryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Posted') {
      const presentModel = await this.modalCtrl.create({
        component: PostedByFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    } else if (pagename == 'Author') {
      const presentModel = await this.modalCtrl.create({
        component: AuthorIndustriesFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {});

      return await presentModel.present();
    }
  }
}
