import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationAddPage } from './location-add.page';

const routes: Routes = [
  {
    path: '',
    component: LocationAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationAddPageRoutingModule {}
