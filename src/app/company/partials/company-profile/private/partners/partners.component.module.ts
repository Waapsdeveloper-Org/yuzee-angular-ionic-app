import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartnersComponent } from "./partners.component";
import { EditPartnersComponent } from "./edit-partners/edit-partners.component";
import { SearchPartnersComponent } from "./search-partners/search-partners.component";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SeeAllPartnersComponent } from "./see-all-partners/see-all-partners.component";
import { EmptyModule } from "../../../../../shared/empty/empty.module";
import { AppSharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    PartnersComponent,
    EditPartnersComponent,
    SearchPartnersComponent,
    SeeAllPartnersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    EmptyModule,
    AppSharedModule
  ],
  exports: [PartnersComponent],
})
export class PartnersComponentModule {}
