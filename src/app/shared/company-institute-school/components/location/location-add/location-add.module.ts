import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { LocationAddPageRoutingModule } from './location-add-routing.module';

import { LocationAddPage } from './location-add.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    LocationAddPageRoutingModule
  ],
  declarations: [LocationAddPage]
})
export class LocationAddPageModule {}
