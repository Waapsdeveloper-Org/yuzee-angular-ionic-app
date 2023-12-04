import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { EditawardscertifcatesPageRoutingModule } from "./editawardscertifcates-routing.module";
import { EditawardscertifcatesPage } from "./editawardscertifcates.page";
import { AppSharedModule } from "src/app/shared/shared.module";
import { AppSharedLibraryModule } from "src/app/library/shared-library.module";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CompanySharedModule } from "src/app/company/shared/company-shared.module";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    EditawardscertifcatesPageRoutingModule,
    AppSharedLibraryModule,
    AppSharedModule
    
  ],
  declarations: [EditawardscertifcatesPage],
})
export class EditawardscertifcatesPageModule {}
