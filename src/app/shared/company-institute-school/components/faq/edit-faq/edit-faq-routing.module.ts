import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditFAQPage } from "./edit-faq.page";
const routes: Routes = [
  {
    path: "",
    component: EditFAQPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFAQPageRoutingModule {}
