import { Component, Injector, OnInit } from "@angular/core";
import { sliderArrayInternshipPrograms } from "src/app/app.constants";
import { CompanyHelperService } from "src/app/services/company-helper.service";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";

@Component({
  selector: "app-internship-program",
  templateUrl: "./internship-program.component.html",
  styleUrls: ["./internship-program.component.scss"],
})
export class InternshipProgramComponent extends CcBasePage implements OnInit {
  sliderArray = sliderArrayInternshipPrograms;
  internshipProgramDetails: any;
  
  internshipProgramListArray = [] // courseListArray;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(injector: Injector, public ccHelperService: CompanyHelperService ) {
    super(injector);
    
  }

  ngOnInit(): void {
    this.initialize();
  }

  internshipProgramEvent(data) {
   
  }

  async initialize() {
    const res = (await this.ccHelperService.getAllInternShip(this.pageNumber, this.pageSize)) as [];
    this.internshipProgramListArray = res;
  }
}
