import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IonTabs } from "@ionic/angular";
import { AppGenericService } from "src/services/generic.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  interval: any;
  tokenRes: any = {};
  userLogintime: number;
  timeSetInterval: number;

  constructor(
    private genericService: AppGenericService,
    private router: Router
  ) {
    if (localStorage.getItem("LoginResponceToken")) {
      let userDataDetail = JSON.parse(localStorage.getItem("user_data_details"));
      if (userDataDetail.roles.length > 0)
        if (userDataDetail.roles[0]?.name === "onboarding") this.router.navigate(["/profileSetup"]);
    } else {
      this.router.navigate(["yuzee-welcome"]);
    }
  }

  gets(tab: IonTabs) {
    if ("/tabs/" + tab.getSelected() != this.router.url) {
      this.router.navigateByUrl("tabs/" + tab.getSelected());
    }
    if(tab.getSelected() == 'job-applicants'){
      this.genericService.applicantTab.next(tab.getSelected());
    }
    if(tab.getSelected() == 'application-procedure'){
      this.genericService.selectTabActive.next(tab.getSelected());
    }
    if(tab.getSelected() == 'all-apply-process'){
      this.genericService.selectTabActive.next(tab.getSelected());
    }
    if(tab.getSelected() == 'home'){
      this.genericService.selectTabActive.next(tab.getSelected());
    }
  }

  tabChanged(){
  }

}