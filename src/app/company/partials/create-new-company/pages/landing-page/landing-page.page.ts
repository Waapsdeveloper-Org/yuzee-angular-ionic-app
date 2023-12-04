import { Component, Injector } from "@angular/core";
import { CcBasePage } from "../../../../../shared/cc-base-page/cc-base-page";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.page.html",
  styleUrls: ["./landing-page.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LandingPagePage extends CcBasePage {
  selectedOption: any;
  listItems = [
    {
      id: "create",
      icon: "create-institution-company",
      title: "Create",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: "find",
      icon: "find-institution-company",
      title: "Find",
      description: "Yuzee collects company data, check if we have it.",
    },
  ];
  constructor(injector: Injector) {
    super(injector);
  }

  select(index: number) {
    this.selectedOption = this.listItems[index];

    if (this.selectedOption.id === "create") {
      this.nextPage();
    }
  }

  disableNext() {
    if (this.selectedOption && this.selectedOption.id === "find") {
      return true;
    }

    if (!this.selectedOption) {
      return true;
    }
  }

  nextPage() {
    if (!this.selectedOption) {
      return;
    }
    if (this.selectedOption.id === "create") {
      this.ccNavService.push("create-new-company/introduction");
    } else {
      return;
    }
  }

  back() {
    this.ccNavService.pop();
  }
}
