import { Component, Input, OnInit } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {

  @Input("isInstitute") isInstitute;
  @Input("private") private = true;

  location: string = null;
  bannerInfo: any;
  schoolType: any = {};

  constructor(private shared: SharedService) { }

  ngOnInit() {
    if (this.isInstitute) {
      this.shared.basicInfo.subscribe((res => {this.bannerInfo = res}))

    } else {
      this.shared.companyDetailsFetched.subscribe((res) => {
        this.location =
          res.location.city_name + ", " + res.location.country_name;
      });

      this.shared.companyBannerInfoFetched.subscribe((res) => {
        this.bannerInfo = res.data;
      });
    }
  }
}
