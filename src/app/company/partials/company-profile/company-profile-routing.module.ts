import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { FollowersComponent } from 'src/app/my-people';
import { QuestionsComponent } from 'src/app/post';
import {
  CommentsComponent,
  ViewImageComponent,
} from 'src/app/shared';
import { LikersComponent } from 'src/app/shared/gallery/likers/likers.component';

import { AddToProfileComponent } from '../../../shared/profile-shared/add-to-profile/add-to-profile.component';
import { CompanyProfilePage } from './company-profile.page';
import { ABNVarificationComponent } from './private/abn-varification/abn-varification.component';
import { CompanyAboutTabComponent } from './private/company-about-tab/company-about-tab.component';
import { CompanyEventTabComponent } from './private/company-event-tab/company-event-tab.component';
import { ScholarshipsListComponent } from 'src/app/scholarships';
import { CompanyReviewTabComponent } from './private/company-review-tab/company-review-tab.component';
import { CompanyGalleryTabComponent } from '../../../company-gallery-tab/company-gallery-tab.component';


const routes: Routes = [
  {
    path: "",
    component: CompanyProfilePage,
    children: [
      {
        path: "",
        redirectTo: "aboutTab",
        pathMatch: "full",
      },
      {
        path: "aboutTab",
        component: CompanyAboutTabComponent,
      },
      {
        path: "homeTab",
        component: CompanyAboutTabComponent,
      },
      {
        path: "cultureTab",
        component: CompanyAboutTabComponent,
      },
      {
        path: "reviews",
        component: CompanyReviewTabComponent,
      },
      {
        path: "internship",
        loadChildren: () =>
          import('../internship-programs/internship-program.module').then(
            (m) => m.InternshipProgramPageModule
          ),
          data: {profileType: 'COMPANY'}
      },
      {
        path: "event",
        component: CompanyEventTabComponent,
      },
      {
        path: "comp-gallery",
        component: CompanyGalleryTabComponent,
        data: {profileType: 'INSTITUTE'}
      },
      {
        path: 'scholarship-list',
        component: ScholarshipsListComponent,
        data: {profileType: 'INSTITUTE'}
      },
      {
        path: 'career-advice',
        loadChildren: () =>
          import('../../../career-advice/career-advice.module').then(
            (m) => m.CareerAdviceModule
          ),
          data: {profileType: 'COMPANY'}
      },
      {
        path: 'staff-interview',
        loadChildren: () =>
          import('../../../staff-interview/staff-interview.module').then(
            (m) => m.StaffInterviewModule
          ),
          data: {profileType: 'COMPANY'}
      }
    ],
  },
  {
    path: "homeTab/followers",
    component: FollowersComponent,
  },
  {
    path: "cultureTab/assesments/questions",
    component: QuestionsComponent,
  },
  {
    path: "add-to-profile",
    component: AddToProfileComponent,
  },
  {
    path: "view-image",
    component: ViewImageComponent,
  },
  {
    path: "likers",
    component: LikersComponent,
  },
  {
    path: "abn-verification",
    component: ABNVarificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyProfilePageRoutingModule {}
