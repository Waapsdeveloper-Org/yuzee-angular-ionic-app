import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { InternshipProgramComponent } from './internship-program/internship-program.component';


const routes: Routes = [
  {
    path: "",
    component: InternshipProgramComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternshipProgramPageRoutingModule {}
