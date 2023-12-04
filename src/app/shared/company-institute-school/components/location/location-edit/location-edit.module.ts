import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { LocationEditPageRoutingModule } from './location-edit-routing.module';
import { LocationEditPage } from './location-edit.page';
import { AppSharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    IonicModule,
    LocationEditPageRoutingModule,
    AppSharedModule
  ],
  declarations: [LocationEditPage]
})
export class LocationEditPageModule {}