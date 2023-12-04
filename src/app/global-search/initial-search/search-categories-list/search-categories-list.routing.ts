import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCategoriesListComponent } from './search-categories-list.component';

const routes: Routes = [
  {
    path: "",
    component: SearchCategoriesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCategoriesListComponentRoutingModule {}
