import { NgModule } from "@angular/core";
import { CommonModule, UpperCasePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CreateNewCompanyFormPageRoutingModule } from "./create-new-company-form-routing.module";
import { CreateNewCompanyFormPage } from "./create-new-company-form.page";
import { TranslateModule } from "@ngx-translate/core";
import { CcFormDescSlideComponent } from "../../components/cc-form-desc-slide/cc-form-desc-slide.component";
import { CompanyCreateSkillsComponent } from "../../components/company-create-skills/company-create-skills.component";
import { AppSharedModule } from "src/app/shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewCompanyFormPageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    AppSharedModule
  ],
  declarations:[
    CreateNewCompanyFormPage,
    CcFormDescSlideComponent,
    CompanyCreateSkillsComponent
  ],

  providers: [UpperCasePipe],

})

export class CreateNewCompanyFormPageModule {}
