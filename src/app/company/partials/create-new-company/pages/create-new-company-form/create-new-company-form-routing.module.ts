import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewCompanyFormPage } from './create-new-company-form.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewCompanyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewCompanyFormPageRoutingModule {}
