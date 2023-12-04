import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AppSharedModule } from "../../../../shared/shared.module";
import { CompanyContactEditDetailsComponent } from "./company-contact-edit-details/company-contact-edit-details.component";
import { CompanyContactSeeAllListComponent } from "./company-contact-see-all-list/company-contact-see-all-list.component";
import { ContactTypeSelectComponent } from "./contact-type-select/contact-type-select.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    TranslateModule,
    AppSharedModule,
    RouterModule,
  ],
  declarations: [
    CompanyContactEditDetailsComponent,
    CompanyContactSeeAllListComponent,
    ContactTypeSelectComponent,
  ],
  entryComponents: [
    CompanyContactEditDetailsComponent,
    CompanyContactSeeAllListComponent,
  ],
  exports: [
    CompanyContactEditDetailsComponent,
    CompanyContactSeeAllListComponent,
  ],
})
export class ContactDetailsModule {
  static forRoot() {
    return {
      ngModule: ContactDetailsModule,
    };
  }
}
