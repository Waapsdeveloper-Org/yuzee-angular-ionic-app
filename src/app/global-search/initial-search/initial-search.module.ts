import { NgModule } from "@angular/core";
// import { SearchCategoriesListComponentRoutingModule } from "./search-categories-list.routing";
import { InitialSearchComponentRoutingModule } from "./initial-search.routing";
import { InitialSearchComponent } from "./initial-search.component";
import { SearchCategoriesListModule } from "./search-categories-list/search-categories-list.module";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InitialSearchComponentRoutingModule, 
    SearchCategoriesListModule],
  declarations: [InitialSearchComponent],
})
export class InitialSearchComponentModule {}
