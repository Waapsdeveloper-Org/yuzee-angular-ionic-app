import { NgModule } from "@angular/core";
import { SearchCategoriesListComponentRoutingModule } from "./search-categories-list.routing";
import { SearchCategoriesListComponent } from "./search-categories-list.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CustomPipesModule } from "src/app/library/pipes/custom-pipes.module";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    SearchCategoriesListComponentRoutingModule,
    CustomPipesModule,
  ],
  declarations: [SearchCategoriesListComponent],
  exports: [SearchCategoriesListComponent],
})
export class SearchCategoriesListModule {}
