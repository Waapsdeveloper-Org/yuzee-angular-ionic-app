import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {AppSharedModule} from '../../../shared/shared.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// Import all componets as {}
import * as COMPONENT from '.';



@NgModule({
    imports: [
        TranslateModule,
        AppSharedModule,
        CommonModule,
        RouterModule,
        IonicModule,
        FormsModule,
    ],
    declarations: [
        COMPONENT.CompanySelectComponent

    ],
    entryComponents: [
        COMPONENT.CompanySelectComponent

    ],
    exports: [
        COMPONENT.CompanySelectComponent
    ],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CompanyPopUpModule {
    static forRoot() {
        return {
            ngModule: CompanyPopUpModule
        };
    }
}
