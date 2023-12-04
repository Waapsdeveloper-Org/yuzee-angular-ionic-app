import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditawardscertifcatesPage } from "./editawardscertifcates.page";

const routes: Routes = [
  {
    path: "",
    component: EditawardscertifcatesPage,
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditawardscertifcatesPageRoutingModule {}
