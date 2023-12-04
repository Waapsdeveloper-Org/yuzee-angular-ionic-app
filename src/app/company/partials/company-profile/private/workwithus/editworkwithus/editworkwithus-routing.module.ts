import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditworkwithusPage } from './editworkwithus.page';

const routes: Routes = [
  {
    path: '',
    component: EditworkwithusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditworkwithusPageRoutingModule {}
