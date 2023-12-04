import { NgModule } from "@angular/core";
import { FirstLetterCapitalPipe } from "./first-letter-capital.pipe";

@NgModule({
  imports: [],
  declarations: [FirstLetterCapitalPipe],
  exports: [FirstLetterCapitalPipe],
})
export class CustomPipesModule {}
