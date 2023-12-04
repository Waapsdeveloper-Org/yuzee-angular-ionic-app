import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { AppSharedModule } from "../../shared/shared.module";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
// import {MatExpansionModule} from '@angular/material/expansion';

// Import all componets as {}
import * as COMPONENT from ".";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ModalController } from "@ionic/angular";

@NgModule({
  imports: [
    // MatExpansionModule,
    TranslateModule.forChild(),
    AppSharedModule,
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
  ],
  
  declarations: [
  
    COMPONENT.PopUpGenericComponent,
    COMPONENT.AddAttachmentButtonComponent,
    COMPONENT.AnewAttachmentComponent,
    COMPONENT.AttachmentItemComponent,
    COMPONENT.AttachmentsComponent,
    COMPONENT.EducationComponent,
    COMPONENT.EditEducationComponent,
    COMPONENT.MembersComponent,
    COMPONENT.SkillsetComponent,
  
    COMPONENT.EditAttachmentsComponent,
    COMPONENT.InternshipProgramComponent,
    COMPONENT.InternshipProgramListComponent,
    COMPONENT.InternshipProgramDetailsComponent,
    COMPONENT.InternshipProgramMembersComponent,
    COMPONENT.InternshipProgramVideosComponent,
    COMPONENT.InternshipProgramMoreOptionsComponent,
    COMPONENT.SeeAllSkillSetComponent,
    COMPONENT.SkillsCoursesStructureComponent,
    COMPONENT.SeeAllMembersListComponent,
    COMPONENT.SeeAllAttachmentsComponent


  ],
  entryComponents: [
    
    COMPONENT.PopUpGenericComponent,
    COMPONENT.AddAttachmentButtonComponent,
    COMPONENT.AnewAttachmentComponent,
    COMPONENT.AttachmentItemComponent,
    COMPONENT.AttachmentsComponent,
    COMPONENT.EducationComponent,
    COMPONENT.EditEducationComponent,
    COMPONENT.MembersComponent,
    COMPONENT.SkillsetComponent,
    COMPONENT.EditAttachmentsComponent,
    COMPONENT.InternshipProgramComponent,
    COMPONENT.InternshipProgramListComponent,
    COMPONENT.InternshipProgramDetailsComponent,
    COMPONENT.InternshipProgramMembersComponent,
    COMPONENT.InternshipProgramVideosComponent,
    COMPONENT.InternshipProgramMoreOptionsComponent,
    COMPONENT.SeeAllSkillSetComponent,
    COMPONENT.SkillsCoursesStructureComponent,
    COMPONENT.SeeAllMembersListComponent,
    COMPONENT.SeeAllAttachmentsComponent
  ],
  exports: [
  
    COMPONENT.PopUpGenericComponent,
    COMPONENT.AddAttachmentButtonComponent,
    COMPONENT.AnewAttachmentComponent,
    COMPONENT.AttachmentItemComponent,
    COMPONENT.AttachmentsComponent,
    COMPONENT.EducationComponent,
    COMPONENT.EditEducationComponent,
    COMPONENT.MembersComponent,
    COMPONENT.SkillsetComponent,
    COMPONENT.EditAttachmentsComponent,
    COMPONENT.InternshipProgramComponent,
    COMPONENT.InternshipProgramListComponent,
    COMPONENT.InternshipProgramDetailsComponent,
    COMPONENT.InternshipProgramMembersComponent,
    COMPONENT.InternshipProgramVideosComponent,
    COMPONENT.InternshipProgramMoreOptionsComponent,
    COMPONENT.SeeAllSkillSetComponent,
    COMPONENT.SkillsCoursesStructureComponent,
    COMPONENT.SeeAllMembersListComponent,
    COMPONENT.SeeAllAttachmentsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompanySharedModule {
  static forRoot() {
    return {
      ngModule: CompanySharedModule,
    };
  }
}
