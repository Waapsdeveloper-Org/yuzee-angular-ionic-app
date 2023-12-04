import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from 'src/app/library';
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./Identity/identity.module").then((m) => m.IdentityPageModule),
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./user-profile/user-profile.module").then(
        (m) => m.UserProfilePageModule
      ),
  },
  {
    path: "institution-profile",
    loadChildren: () =>
      import(
        "./institution/partials/institution-profile/institution-profile.module"
      ).then((m) => m.InstitutionProfilePageModule),
      data: { module:'INSTITUTE_MODULE', claim:'INSTITUTE_GET' },
      canActivate: [AuthGuard]
  },
  {
    path: "global-search",
    loadChildren: () =>
      import("./global-search/global-search.module").then(
        (m) => m.GlobalSearchPageModule
      ),
  },
  {
    path: "profileSetup",
    loadChildren: () =>
      import("./profile-setup/profile-setup.module").then(
        (m) => m.ProfileSetupPageModule
      ),
  },
  {
    path: "my-people",
    loadChildren: () =>
      import("./my-people/my-people.module").then((m) => m.MyPeoplePageModule),
  },
  {
    path: "jobs",
    loadChildren: () => import("./jobs/jobs.module").then((m) => m.JobsModule),
  },
  {
    path: "job-applicants",
    loadChildren: () =>
      import("./job-applicants/job-applicants.module").then(
        (m) => m.JobApplicantsPageModule
      ),
  },
  {
    path: "company-profile",
    loadChildren: () =>
      import("./company/partials/company-profile/company-profile.module").then(
        (m) => m.CompanyProfilePageModule
      ),
  },
  {
    path: "application-procedure",
    loadChildren: () =>
      import("./application/sub-modules/institute/application-procedure/application-procedure.module").then(
        (m) => m.ApplicationProcedurePageModule
      ),
  },
  {
    path: "apply-applications",
    loadChildren: () =>
      import("./application/sub-modules/apply-applications/apply-applications.module").then(
        (m) => m.ApplyApplicationsPageModule
      ),
  },
  {
    path: "all-apply-process",
    loadChildren: () =>
      import("./application/sub-modules/all-apply-process/all-apply-process.module").then(
        (m) => m.AllApplyProcessPageModule
      ),
  },
  // START
  // new company create routings group togather in a single module and route there
  {
    path: "create-new-company",
    loadChildren: () =>
      import(
        "./company/partials/create-new-company/pages/cc-pages.module"
      ).then((m) => m.CcPagesModule),
  },
  // ENDS New Company routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }
      // , { preloadingStrategy: PreloadAllModules }
      ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
