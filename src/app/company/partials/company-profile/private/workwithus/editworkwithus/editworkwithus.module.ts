import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EditworkwithusPageRoutingModule } from './editworkwithus-routing.module';

import { EditworkwithusPage } from './editworkwithus.page';
import { AppSharedLibraryModule } from 'src/app/library/shared-library.module';
import { AppSharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    EditworkwithusPageRoutingModule,
    AppSharedLibraryModule,
    AppSharedModule
 
  ],
  declarations: [EditworkwithusPage]
})
export class EditworkwithusPageModule {}
