import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationEditPage } from './location-edit.page';

const routes: Routes = [
  {
    path: '',
    component: LocationEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationEditPageRoutingModule {}
