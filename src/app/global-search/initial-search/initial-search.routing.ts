import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SearchCategoriesListComponent } from './search-categories-list.component';
import { InitialSearchComponent } from './initial-search.component';

const routes: Routes = [
  {
    path: "",
    component: InitialSearchComponent,
    children: [
      {
        path: "searched-list",
        loadChildren: () =>
          import(
            "./../initial-search/search-categories-list/search-categories-list.module"
          ).then((m) => m.SearchCategoriesListModule),
        // component: COMPONENT.SearchCategoriesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialSearchComponentRoutingModule {}
