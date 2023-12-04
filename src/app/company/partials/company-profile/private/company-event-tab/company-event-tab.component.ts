import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "src/app/services/shared.service";
@Component({
  selector: "app-company-event-tab",
  templateUrl: "./company-event-tab.component.html",
  styleUrls: ["./company-event-tab.component.scss"],
})
export class CompanyEventTabComponent implements OnInit {
  companyId: string = null;

  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.companyId = this.shared.companyId;
  }

}
