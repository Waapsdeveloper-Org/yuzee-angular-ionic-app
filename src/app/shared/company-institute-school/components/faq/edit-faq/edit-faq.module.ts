import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { EditFAQPageRoutingModule } from "./edit-faq-routing.module";
import { EditFAQPage } from "./edit-faq.page";
import { AppSharedModule } from "src/app/shared/shared.module";
import { CompanySharedModule } from "src/app/company/shared/company-shared.module";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    EditFAQPageRoutingModule,
    CompanySharedModule,
    AppSharedModule
  ],
  declarations: [
    EditFAQPage,
  ],
})
export class EditFAQPageModule {}
