import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalSearchPage } from './global-search.page';
import * as COMPONENT from './';

const routes: Routes = [
  {
    path: "",
    component: GlobalSearchPage,
    children: [
      {
        path: "",
        redirectTo: "initial",
        pathMatch: "full",
      },
      {
        path: "initial",
        loadChildren: () => 
        import('./initial-search/initial-search.module').then((m) => m.InitialSearchComponentModule),
        // component: COMPONENT.InitialSearchComponent,
      },
      
      {
        path: "mainLanding",
        component: COMPONENT.MainLandingPageComponent,
      },
      {
        path: "people",
        component: COMPONENT.SearchedPeopleComponent,
      },
      {
        path: "course",
        component: COMPONENT.SearchedCoursesComponent,
      },
      {
        path: "institute",
        component: COMPONENT.SearchedInstitutionComponent,
      },
      {
        path: "scholarship",
        component: COMPONENT.SearchedScholarshipComponent,
      },
      {
        path: "companies",
        component: COMPONENT.SearchedCompanyComponent,
      },
      {
        path: "jobs",
        component: COMPONENT.SearchedJobsComponent,
      },
      {
        path: "events",
        component: COMPONENT.ALlEventsComponent,
      },
      {
        path: "articles",
        component: COMPONENT.SearchedArticlesComponent,
      },
      {
        path: "content",
        component: COMPONENT.SearchedContentComponent,
      },
      {
        path: "videos",
        component: COMPONENT.SearchedVideoComponent,
      },
      {
        path: "wikipedia",
        component: COMPONENT.SearchedWikipediaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalSearchPageRoutingModule {}
