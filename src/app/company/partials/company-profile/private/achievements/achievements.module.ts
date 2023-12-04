import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { EditAchievementsComponent } from "./edit-achievements/edit-achievements.component";
import { SearchPeopleComponent } from "./search-people/search-people.component";
import { SeeAllAchievementsComponent } from "./see-all-achievements/see-all-achievements.component";
import { CompanySharedModule } from "src/app/company/shared/company-shared.module";
import { AppSharedModule } from "src/app/shared/shared.module";
@NgModule({
  imports: [
    CompanySharedModule,
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    TranslateModule.forChild(),
    AppSharedModule,
    RouterModule,
  ],
  declarations: [EditAchievementsComponent, SearchPeopleComponent, SeeAllAchievementsComponent],
  entryComponents: [EditAchievementsComponent],
  exports: [EditAchievementsComponent],
})
export class AchievementsModule {
  static forRoot() {
    return {
      ngModule: AchievementsModule,
    };
  }
}
