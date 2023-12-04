import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { AuthGuard } from "../library/guards/authguard";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then((m) => m.HomePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "search",
        loadChildren: () =>
          import("../search/search.module").then((m) => m.SearchPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "all-apply-process",
        loadChildren: () =>
          import("../application/sub-modules/all-apply-process/all-apply-process.module").then(
            (m) => m.AllApplyProcessPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "application-procedure",
        loadChildren: () =>
          import("../application/sub-modules/institute/application-procedure/application-procedure.module").then(
            (m) => m.ApplicationProcedurePageModule
          ),
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'job-applicants',
      //   loadChildren: () => import('../job-applicants/job-applicants.module').then(m => m.JobApplicantsPageModule),
      //   canActivate: [
      //     AuthGuard
      //   ]
      // },
      {
        path: "notification",
        loadChildren: () =>
          import("../notification/notification.module").then(
            (m) => m.NotificationPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "menu",
        loadChildren: () =>
          import("../menu/menu.module").then((m) => m.MenuPageModule),
        canActivate: [AuthGuard],
        // children: [
        //   {
        //     path: '',
        //     loadChildren: '../menu/menu.module#MenuPageModule'
        //   },
        //   {
        //     path: 'user-profile',
        //     children: [
        //       {
        //         path: '',
        //         loadChildren: '../user-profile/user-profile.module#UserProfilePageModule'
        //       }
        //     ]
        //   }
        // ]
      },
      {
        path: "",
        redirectTo: "/tabs/menu",
        pathMatch: "full",
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

// {
//   path: 'school',
//   loadChildren: () => import('../school/school.module').then(m => m.SchoolPageModule),
//   canActivate: [
//     AuthGuard
//   ]
// },
