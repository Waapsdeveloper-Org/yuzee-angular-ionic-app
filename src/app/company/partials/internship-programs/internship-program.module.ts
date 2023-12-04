import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavParams } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { AppSharedModule } from "../../../shared/shared.module";
import { InternshipProgramPageRoutingModule } from "./internship-program-routing.module";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    IonicModule,
    InternshipProgramPageRoutingModule
    
  ],
  declarations: [
    
  ],
  providers: [NavParams],
})
export class InternshipProgramPageModule {}

