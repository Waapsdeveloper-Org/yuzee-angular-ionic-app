import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing-page",
    pathMatch: "full",
  },
  {
    path: "landing-page",
    loadChildren: () =>
      import("./landing-page/landing-page.module").then(
        (m) => m.LandingPagePageModule
      ),
  },
  {
    path: "introduction",
    loadChildren: () =>
      import("./introduction/introduction.module").then(
        (m) => m.IntroductionPageModule
      ),
  },
  {
    path: "create-new-company-form",
    loadChildren: () =>
      import("./create-new-company-form/create-new-company-form.module").then(
        (m) => m.CreateNewCompanyFormPageModule
      ),
  },

  {
    path: 'create-institution-form',
    loadChildren: () => import('../../../../institution/partials/create-institution-form/create-institution-form.module').then( m => m.CreateInstitutionFormPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
