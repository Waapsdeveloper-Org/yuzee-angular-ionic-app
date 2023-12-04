import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { BarRatingModule } from "ngx-bar-rating";
import { PinchZoomModule } from "ngx-pinch-zoom";

import { IonicModule, NavParams } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

import { AppSharedModule } from "../../../shared/shared.module";
import { ABNVarificationComponent } from "./private/abn-varification/abn-varification.component";
import { CompanyProfilePageRoutingModule } from "./company-profile-routing.module";
import { CompanyProfilePage } from "./company-profile.page";
import { AboutComponent } from "../../../shared/company-institute-school/components/about/about.component";
import { AchievementsComponent } from "./private/achievements/achievements.component";
import { AchievementsModule } from "./private/achievements/achievements.module";
import { AwardsComponent } from "./private/awards/awards.component";
import { CompanyAboutTabComponent } from "./private/company-about-tab/company-about-tab.component";
import { CompanyEventTabComponent } from "./private/company-event-tab/company-event-tab.component";
import { ContactDetailsModule } from "../../../shared/company-institute-school/components/contactdetails/contactdetails.module";
import { EditProfileComponent } from "./private/edit-profile/edit-profile.component";
import { LocationComponent } from "../../../shared/company-institute-school/components/location/location.component";
import { NavbarComponent } from "./private/navbar/navbar.component";
import { WorkwithusComponent } from "./private/workwithus/workwithus.component";
import { CompanyPopUpModule } from "../../popups/company-select/company-select-module";
import { CompanySharedModule } from "../../shared/company-shared.module";
import { ProfileStatusModalModule } from "../../../shared/profile-shared/profile-status-modal/profile-status-modal.module";
import { KeywordsComponent } from "../../../shared/company-institute-school/components/faq/keywords/keywords.component";
import { DeleteConfirmationComponent } from "../../shared/delete-confirmation/delete-confirmation.component";
import { PartnersComponentModule } from "./private/partners/partners.component.module";
import { SeeAllFaqComponent } from "../../../shared/company-institute-school/components/faq/see-all-faq/see-all-faq.component";
import { SeeAllAwardsComponent } from "./private/awards/see-all-awards/see-all-awards.component";
import { EmptyModule } from "../../../shared/empty/empty.module";

import { EditworkwithusPageModule } from "./private/workwithus/editworkwithus/editworkwithus.module";
import { EditawardscertifcatesPageModule } from "./private/awards/editawardscertifcates/editawardscertifcates.module";
import { AddToProfileComponent } from "./private/add-to-profile/add-to-profile.component";

import { EditFAQPageModule } from "src/app/shared/company-institute-school/components/faq/edit-faq/edit-faq.module";
import { ScholarshipModule } from "src/app/scholarships/scholarships.module";
import { AppEventModule } from "src/app/events/event.module";
import { AddAVideoComponent } from "src/app/user-profile";
import { CompanyReviewTabComponent } from "./private/company-review-tab/company-review-tab.component";
import { CreateReviewComponent } from "./private/company-review-tab/create-review/create-review.component";
import { ReviewSliderComponent } from "src/app/shared/review/review-slider/review-slider.component";
import { ReviewsModule } from "src/app/reviews/reviews.module";
import { InternshipProgramPageModule } from "../internship-programs/internship-program.module";
import { CompanyGalleryTabComponent } from "../../../company-gallery-tab/company-gallery-tab.component";

@NgModule({
  imports: [
    PinchZoomModule,
    BarRatingModule,
    AchievementsModule,
    CompanySharedModule,
    ContactDetailsModule,
    CompanyPopUpModule,
    AppSharedModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyProfilePageRoutingModule,
    ProfileStatusModalModule,
    PartnersComponentModule,
    EmptyModule,
    EditworkwithusPageModule,
    EditawardscertifcatesPageModule,
    EditFAQPageModule,
    ScholarshipModule,
    AppEventModule,
    ReviewsModule,
    InternshipProgramPageModule
  ],
  declarations: [
    ABNVarificationComponent,
    CompanyEventTabComponent,
    EditProfileComponent,
    CompanyProfilePage,
    AboutComponent,
    CompanyAboutTabComponent,
    AchievementsComponent,
    AwardsComponent,
    CompanyGalleryTabComponent,
    SeeAllFaqComponent,
    LocationComponent,
    NavbarComponent,
    WorkwithusComponent,
    KeywordsComponent,
    DeleteConfirmationComponent,
    SeeAllAwardsComponent,
    AddToProfileComponent,
    AddAVideoComponent,
    CompanyReviewTabComponent,
    CreateReviewComponent,
    ReviewSliderComponent,
  ],
  providers: [NavParams],
})
export class CompanyProfilePageModule {}

