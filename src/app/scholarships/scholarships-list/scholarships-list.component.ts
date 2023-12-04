import { Component, Injector, Input, OnInit } from "@angular/core";
import { scholarshipsSliderArray } from "src/app/app.constants";
import { ViewAllScholarshipsComponent } from "../view-all-scholarships/view-all-scholarships.component";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { ActivatedRoute } from "@angular/router";
import { ScholarshipHelperService } from "src/app/services/scholarship-helper.service";

@Component({
  selector: "app-scholarships-list",
  templateUrl: "./scholarships-list.component.html",
  styleUrls: ["./scholarships-list.component.scss"],
})
export class ScholarshipsListComponent extends CcBasePage implements OnInit {
  @Input() profileType: any;
  @Input() hasAccessGetScholarship;
  @Input() hasAccessScholarshipDelete;
  @Input() isInstitute;
  sliderArray = scholarshipsSliderArray;
  showSlider = false;

  constructor(
    injector: Injector,
    public activatedRoute: ActivatedRoute,
    private scHelper: ScholarshipHelperService) {
    super(injector);
  }

  ngOnInit() {

    const params = this.getDataParams();
    if(!params?.profileType){
      window.history.back()
      return;
    }

    this.profileType = params.profileType;
    this.scHelper.initialize(this.profileType);
    this.scHelper.getPaginatedScholarshipBasedOnEntityAndType();
  }

  ionViewWillEnter() {}

  getDataParams(){
    return this.activatedRoute.snapshot.data;
  }

  async viewAllScholarships() {
    await this.ccModalService.present(
      ViewAllScholarshipsComponent,
      { profileType: this.profileType, isInstitute: this.isInstitute},
      "modal-full-screen-view",
      "right",
      "md"
    );
  }
  showSliderTest() {
    this.showSlider = true;
  }
}
