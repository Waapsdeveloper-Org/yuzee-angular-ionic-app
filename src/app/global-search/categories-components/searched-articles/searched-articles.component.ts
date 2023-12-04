import { Component, ComponentRef, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { GlobalSearchArticleHelperService } from '../../../services/global-search/global-search-article-helper.service';

import { AuthorIndustriesFilterComponent } from '../../pop-ups/author-industries-filter/author-industries-filter.component';
import { CampusFilterComponent } from '../../pop-ups/campus-filter/campus-filter.component';
import { CategoryFilterComponent } from '../../pop-ups/category-filter/category-filter.component';
import { CompanyFilterComponent } from '../../pop-ups/company-filter/company-filter.component';
import { CountryFilterComponent } from '../../pop-ups/country-filter/country-filter.component';
import { CourseFilterComponent } from '../../pop-ups/course-filter/course-filter.component';
import { DateFilterComponent } from '../../pop-ups/date-filter/date-filter.component';
import { DeadlineFilterComponent } from '../../pop-ups/deadline-filter/deadline-filter.component';
import { DeliveryFilterComponent } from '../../pop-ups/delivery-filter/delivery-filter.component';
import { DurationFilterComponent } from '../../pop-ups/duration-filter/duration-filter.component';
import { FacultyFilterComponent } from '../../pop-ups/faculty-filter/faculty-filter.component';
import { FundingFilterComponent } from '../../pop-ups/funding-filter/funding-filter.component';
import { IndustryFilterComponent } from '../../pop-ups/industry-filter/industry-filter.component';
import { InstitutionFilterComponent } from '../../pop-ups/institution-filter/institution-filter.component';
import { LocationFilterComponent } from '../../pop-ups/location-filter/location-filter.component';
import { MainCategoriesComponent } from '../../pop-ups/main-categories/main-categories.component';
import { PostedByFilterComponent } from '../../pop-ups/posted-by-filter/posted-by-filter.component';
import { PriceFilterComponent } from '../../pop-ups/price-filter/price-filter.component';
import { SalaryFilterComponent } from '../../pop-ups/salary-filter/salary-filter.component';
import { ScheduleFilterComponent } from '../../pop-ups/schedule-filter/schedule-filter.component';
import { StudyLevelFilterComponent } from '../../pop-ups/study-level-filter/study-level-filter.component';
import { TypeFilterComponent } from '../../pop-ups/type-filter/type-filter.component';
import { ValidityFilterComponent } from '../../pop-ups/validity-filter/validity-filter.component';
import { WorldRatingFilterComponent } from '../../pop-ups/world-rating-filter/world-rating-filter.component';

@Component({
  selector: 'app-searched-articles',
  templateUrl: './searched-articles.component.html',
  styleUrls: ['./searched-articles.component.scss'],
})
export class SearchedArticlesComponent implements OnInit {

  SelectedCategory: any;
  SendGlobalData;

  constructor(
    public gsHelper: GlobalSearchArticleHelperService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    localStorage.setItem('tabName', 'articles');
    this.SelectedCategory = localStorage.getItem('tabName');
  }

  async openFilterPage(pagename) {
    if (pagename === 'Location') {
      const presentModel = await this.modalCtrl.create({
        component: LocationFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Company') {
      const presentModel = await this.modalCtrl.create({
        component: CompanyFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Institution') {
      const presentModel = await this.modalCtrl.create({
        component: InstitutionFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Date') {
      const presentModel = await this.modalCtrl.create({
        component: DateFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Course') {
      const presentModel = await this.modalCtrl.create({
        component: CourseFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Faculty') {
      const presentModel = await this.modalCtrl.create({
        component: FacultyFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Duration') {
      const presentModel = await this.modalCtrl.create({
        component: DurationFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Delivery') {
      const presentModel = await this.modalCtrl.create({
        component: DeliveryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Funding') {
      const presentModel = await this.modalCtrl.create({
        component: FundingFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Price') {
      const presentModel = await this.modalCtrl.create({
        component: PriceFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'SLevel') {
      const presentModel = await this.modalCtrl.create({
        component: StudyLevelFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'SType') {
      const presentModel = await this.modalCtrl.create({
        component: TypeFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Type') {
      const presentModel = await this.modalCtrl.create({
        component: TypeFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Category') {
      const presentModel = await this.modalCtrl.create({
        component: CategoryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Campus') {
      const presentModel = await this.modalCtrl.create({
        component: CampusFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Salary') {
      const presentModel = await this.modalCtrl.create({
        component: SalaryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Schedule') {
      const presentModel = await this.modalCtrl.create({
        component: ScheduleFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Ranking') {
      const presentModel = await this.modalCtrl.create({
        component: WorldRatingFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Deadline') {
      const presentModel = await this.modalCtrl.create({
        component: DeadlineFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Country') {
      const presentModel = await this.modalCtrl.create({
        component: CountryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Validity') {
      const presentModel = await this.modalCtrl.create({
        component: ValidityFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Industry') {
      const presentModel = await this.modalCtrl.create({
        component: IndustryFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Posted') {
      const presentModel = await this.modalCtrl.create({
        component: PostedByFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    } else if (pagename === 'Author') {
      const presentModel = await this.modalCtrl.create({
        component: AuthorIndustriesFilterComponent,
        showBackdrop: true,
        mode: 'ios',
      });

      presentModel.onWillDismiss().then((data) => {
        console.log(data);
      });

      return await presentModel.present();
    }
  }
  searchByGlobal() {

  }
}
