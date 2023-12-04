import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPageModule } from '../course-detail/course-detail.module';
import { InstitutionProfilePageModule } from '../institution/partials/institution-profile/institution-profile.module';

import { AppSharedModule } from '../shared/shared.module';
import * as COMPONENTS from './';
import { GlobalSearchPageRoutingModule } from './global-search-routing.module';
import { GlobalSearchPage } from './global-search.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { setTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppSharedModule,
    GlobalSearchPageRoutingModule,
    TranslateModule.forChild(),
    // CourseDetailPageModule,
    // InstitutionProfilePageModule,
    // AuthorIndustriesFilterPageModule,
  ],
  declarations: [
    GlobalSearchPage,
    COMPONENTS.ContentViewComponent,
    COMPONENTS.EventsViewComponent,
    // COMPONENTS.EventInfosComponent,
    COMPONENTS.GspLandingViewComponent,
    COMPONENTS.InstitutionViewComponent,
    COMPONENTS.JobsViewComponent,
    COMPONENTS.PeopleViewComponent,
    COMPONENTS.ScholarshipViewComponent,
    COMPONENTS.StudentViewComponent,
    COMPONENTS.WikipediaViewComponent,
    COMPONENTS.CourseViewComponent,
    COMPONENTS.VideosViewComponent,
    COMPONENTS.CourseRecComponent,
    COMPONENTS.InstiuteRecComponent,
    COMPONENTS.ScholarshipRecComponent,
    COMPONENTS.AdvanceFilterComponent,
    COMPONENTS.CourseAdfComponent,
    COMPONENTS.InstituteAdfComponent,
    COMPONENTS.ScholarshipAdfComponent,
    COMPONENTS.ContentAdfComponent,
    COMPONENTS.RecentSearchMoreComponent,
    COMPONENTS.GspPeopleYouMayKnowComponent,
    COMPONENTS.GspServicesComponent,
    COMPONENTS.GspTopTenCoursesComponent,
    COMPONENTS.GspTopTenInstitutesComponent,
    COMPONENTS.GspOtherPeopleComponent,
    COMPONENTS.CompaniesViewComponent,

    // Initial Search pages

    // COMPONENTS.InitialSearchComponent,
    COMPONENTS.SearchSuggestionComponent,
    COMPONENTS.RecentSearchesComponent,
    // COMPONENTS.SearchCategoriesListComponent,

    // Main Landing Pages
    COMPONENTS.MainLandingPageComponent,
    COMPONENTS.SuggestedForYouComponent,
    COMPONENTS.CompanyComponent,
    COMPONENTS.ArticleViewComponent,
    COMPONENTS.StudentUserComponent,
    COMPONENTS.NormalUserComponent,
    COMPONENTS.ServicesComponent,
    COMPONENTS.CoursesComponent,
    COMPONENTS.OffCampusClassesComponent,
    COMPONENTS.TraineeshipComponent,
    COMPONENTS.ShortCoursesComponent,
    COMPONENTS.IntitutionComponent,
    COMPONENTS.CardsIntitutionComponent,
    COMPONENTS.CompanyComponent,
    COMPONENTS.JobsComponent,
    COMPONENTS.ScholarshipsComponent,
    COMPONENTS.EventsComponent,
    COMPONENTS.ArticlesComponent,
    COMPONENTS.VideosComponent,

    // Categories Components
    COMPONENTS.SearchedPeopleComponent,
    COMPONENTS.SearchedInstitutionRelatedCoursesComponent,
    COMPONENTS.SearchedCoursesComponent,
    COMPONENTS.SearchedInstitutionComponent,
    COMPONENTS.SearchedCompanyComponent,
    COMPONENTS.SearchedScholarshipComponent,
    COMPONENTS.ALlEventsComponent,
    COMPONENTS.PeopleListComponent,
    COMPONENTS.NearbyEventsComponent,
    COMPONENTS.OnlineEventsComponent,
    COMPONENTS.SuggestedEventsComponent,
    COMPONENTS.SearchedArticlesComponent,
    COMPONENTS.SearchedContentComponent,
    COMPONENTS.SearchedWikipediaComponent,
    COMPONENTS.SearchedVideoComponent,
    COMPONENTS.SearchedJobsComponent,

    // Popups
    COMPONENTS.AuthorIndustriesFilterComponent,
    COMPONENTS.CampusFilterComponent,
    COMPONENTS.CompanyFilterComponent,
    COMPONENTS.CategoryFilterComponent,
    COMPONENTS.CountryFilterComponent,
    COMPONENTS.CourseFilterComponent,
    COMPONENTS.DateFilterComponent,
    COMPONENTS.DeadlineFilterComponent,
    COMPONENTS.DeliveryFilterComponent,
    COMPONENTS.FacultyFilterComponent,
    COMPONENTS.FundingFilterComponent,
    COMPONENTS.IndustryFilterComponent,
    COMPONENTS.InstitutionFilterComponent,
    COMPONENTS.InvitePeopleComponent,
    COMPONENTS.JobInfoComponent,
    COMPONENTS.LocationFilterComponent,
    COMPONENTS.MainCategoriesComponent,
    COMPONENTS.OpenMapComponent,
    COMPONENTS.PostedByFilterComponent,
    COMPONENTS.PriceFilterComponent,
    COMPONENTS.PricePopupComponent,
    COMPONENTS.PricePopup2Component,
    COMPONENTS.SalaryFilterComponent,
    COMPONENTS.ScheduleFilterComponent,
    COMPONENTS.StudyLevelFilterComponent,
    COMPONENTS.TypeFilterComponent,
    COMPONENTS.ValidityFilterComponent,
    COMPONENTS.WorldRatingFilterComponent,
    COMPONENTS.GlobalSearchSectionMoreOptionComponent,
    COMPONENTS.MutualFriendsComponent,
    COMPONENTS.InstitutionOfferingsDetailsComponent,
    COMPONENTS.OpenMapInstitutionsComponent,
    COMPONENTS.SearchedInstitutionRelatedCoursesComponent,
    COMPONENTS.GlobalSearchFiltersComponent,
  ],
})
export class GlobalSearchPageModule {}
