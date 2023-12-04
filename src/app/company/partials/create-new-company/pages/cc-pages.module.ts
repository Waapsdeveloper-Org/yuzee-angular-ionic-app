import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { AppSharedModule } from "src/app/shared/shared.module";
import { PagesRoutingModule } from "./cc-pages-routing.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagesRoutingModule,
    TranslateModule,
    AppSharedModule,
    
  ],
  exports: [],
  providers: [Location],
})
export class CcPagesModule {}