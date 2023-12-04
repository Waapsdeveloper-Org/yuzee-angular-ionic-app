import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAchievementsComponent } from './edit-achievements/edit-achievements.component';
const routes: Routes = [

        {
            path: "",
            component:EditAchievementsComponent
          }

  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AchievementsRoutingModule {}