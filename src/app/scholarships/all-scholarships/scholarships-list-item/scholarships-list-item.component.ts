import { Component, Input, OnInit } from "@angular/core";
import { CcStringService } from "src/app/services/cc-string.service";

@Component({
  selector: "app-scholarships-list-item",
  templateUrl: "./scholarships-list-item.component.html",
  styleUrls: ["./scholarships-list-item.component.scss"],
})
export class ScholarshipsListItemComponent implements OnInit {
  validityArray = [
    {
      icon: "assets/svgs/scholarship-time-icon.svg",
      detailsIcon: "assets/svgs/scholarship-details-validity-icon.svg",
      value: "",
      key: "application_deadline",
      keyTitle: "Deadline",
    },
    {
      icon: "assets/svgs/scholarship-earth-icon.svg",
      detailsIcon: "assets/svgs/scholarship-details-calendar-icon.svg",
      value: "",
      key: "validity",
      keyTitle: "Validity",
    },
    {
      icon: "assets/svgs/scholarship-money-icon.svg",
      detailsIcon: "assets/svgs/scholarship-details-money-icon.svg",
      value: "",
      key: "mode_of_covergae",
      keyTitle: "Coverage",
    },
    {
      icon: "assets/svgs/scholarship-degree-icon.svg",
      detailsIcon: "assets/svgs/scholarship-details-level-icon.svg",
      vlaue: "",
      key: "eligible_level",
      keyTitle: "Level",
    },
    {
      icon: "assets/svgs/scholarship-degree-icon.svg",
      detailsIcon: "assets/svgs/scholarship-details-level-icon.svg",
      vlaue: "",
      key: "eligible_nationality",
      keyTitle: "Nationalities",
    },
  ];

  slideOptsScholarships = {
    initialSlide: 0,
    slidesPerView: this.checkScreenSize(),
    speed: 400,
  };

  private nitem: any;

  @Input()
  public get item(): any {
    return this.nitem;
  }

  public set item(value: any) {
    this.nitem = value;
    this.setValidityArrayValues(value);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private strings: CcStringService) {}

  ngOnInit() {}

  setValidityArrayValues(values) {
    this.validityArray = this.validityArray.map((x) => {
      if (values[x.key]) {
        x.value = values[x.key];
      }
      return x;
    }).filter((x) => x.value);
  }

  checkScreenSize() {
    if (window.innerWidth >= 750) {
      return 3.4;
    } else {
      return 1.5;
    }
  }
}
