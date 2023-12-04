import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CKEditorModule } from 'ckeditor4-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BarRatingModule } from 'ngx-bar-rating';
import { YuzeeCommonModule } from 'yuzee-shared-lib';

import { IonicModule } from '@ionic/angular';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { setTranslateLoader } from '../app.module';
import { AppSharedLibraryModule } from '../library/shared-library.module';
import * as COMPONENT from './';
import { AppSharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    BarRatingModule,
    AppSharedLibraryModule,
    CKEditorModule,
    AppSharedModule,
    Ng2SearchPipeModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FormsModule,
  ],
  declarations: [
    // scholarship
    COMPONENT.ScholarshipsListComponent,
    COMPONENT.AllScholarshipsComponent,
    COMPONENT.ViewAllScholarshipsComponent,
    COMPONENT.DeadlineDatePopupComponent,
    COMPONENT.ViewAllScholarshipsDetailsComponent,
    COMPONENT.ScholarshipsListItemComponent,
    COMPONENT.ScholorshipDetailsAboutComponent,
    COMPONENT.ScholorshipDetailsOtherComponent,
    COMPONENT.ScholorshipDetailsAboutPointsComponent,
    COMPONENT.ScholorshipDetailsRequirementsComponent,
    COMPONENT.ScholorshipDetailsAboutKeypointsComponent
  ],
  entryComponents: [
    // scholarship
    COMPONENT.ScholarshipsListComponent,
    COMPONENT.AllScholarshipsComponent,
    COMPONENT.ViewAllScholarshipsComponent,
    COMPONENT.DeadlineDatePopupComponent,
    COMPONENT.ViewAllScholarshipsDetailsComponent,
    COMPONENT.ScholarshipsListItemComponent,
    COMPONENT.ScholorshipDetailsAboutComponent,
    COMPONENT.ScholorshipDetailsOtherComponent,
    COMPONENT.ScholorshipDetailsAboutPointsComponent,
    COMPONENT.ScholorshipDetailsRequirementsComponent,
    COMPONENT.ScholorshipDetailsAboutKeypointsComponent
  ],
  exports: [
    YuzeeCommonModule,
    TranslateModule,
    BarRatingModule,
    CKEditorModule,
    // scholarship
    COMPONENT.ScholarshipsListComponent,
    COMPONENT.AllScholarshipsComponent,
    COMPONENT.ViewAllScholarshipsComponent,
    COMPONENT.DeadlineDatePopupComponent,
    COMPONENT.ViewAllScholarshipsDetailsComponent,
    COMPONENT.ScholarshipsListItemComponent,
    COMPONENT.ScholorshipDetailsAboutComponent,
    COMPONENT.ScholorshipDetailsOtherComponent,
    COMPONENT.ScholorshipDetailsAboutPointsComponent,
    COMPONENT.ScholorshipDetailsRequirementsComponent,
    COMPONENT.ScholorshipDetailsAboutKeypointsComponent
  ],
})
export class ScholarshipModule {
  static forRoot() {
    return {
      ngModule: ScholarshipModule,
    };
  }
}
