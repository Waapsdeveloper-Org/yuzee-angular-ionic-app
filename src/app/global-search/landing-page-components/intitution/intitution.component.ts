import { Component, OnInit, Input } from "@angular/core";
import { CcModalService } from "src/app/services/cc-modal.service";
import { GlobalSearchSectionMoreOptionComponent } from "../..";
import { NgrxService } from "src/app/services/store/ngrx.service";

@Component({
  selector: "app-intitution",
  templateUrl: "./intitution.component.html",
  styleUrls: ["./intitution.component.scss"],
})
export class IntitutionComponent implements OnInit {
  @Input("showSeeAllBtn") seeAll = false;
  @Input("institutionDataArray") institutionDataArray = []; // institutionDataArray;

  constructor(
    private ccModalService: CcModalService,
    public ngrx: NgrxService
  ) {
    this.ngrx.subscribe(
      "global-search-institution",
      this.updateList.bind(this)
    );
  }

  ngOnInit() {}

  updateList(data) {
    this.institutionDataArray = data;
  }
  moreOptions() {
    this.ccModalService.present(
      GlobalSearchSectionMoreOptionComponent,
      {},
      "generic-sm-popup-modal generic-modal generic-model-backdrops",
      "",
      "ios"
    );
  }
}
