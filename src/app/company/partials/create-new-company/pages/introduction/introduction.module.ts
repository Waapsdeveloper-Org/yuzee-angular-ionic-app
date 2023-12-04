import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IntroductionPageRoutingModule } from './introduction-routing.module';
import { IntroductionPage } from './introduction.page';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroductionPageRoutingModule,
    TranslateModule.forChild(),
    AppSharedModule
  ],
  declarations: [IntroductionPage],
  providers:[UpperCasePipe]
})
export class IntroductionPageModule {}