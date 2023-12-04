import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  tabName = "About";
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input("isInstitute") isInstitute;
  constructor(public route: Router) {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    const url = this.route.url;
    switch (url) {
      case "/company-profile/aboutTab":
        this.selectedtab("About");
        break;
      case "/company-profile/scholarship-list":
        this.selectedtab("Scholarships");
        break;
      case "/company-profile/comp-gallery":
        this.selectedtab("gallery");
        break;
      case "/company-profile/reviews":
        this.selectedtab("reviews");
        break;
      case "/company-profile/staff-interview":
        this.selectedtab("staff-interview");
        break;
      case "/company-profile/career-advice":
        this.selectedtab("Career Advice");
        break;
    }
  }

  public selectedtab(page: string) {
    this.tabName = page;
    this.scrollSmoothTab(page);
  }
  scrollSmoothTab(indexValue) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    let element = document.getElementById(indexValue);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }
}
