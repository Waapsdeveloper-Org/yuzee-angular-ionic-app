import { Component, Injector, OnInit } from "@angular/core";
import { MAX_LENGTH } from "src/app/app.constants";

import { SharedService } from "src/app/services/shared.service";
import { GenericDeleteConfirmationComponent } from "src/app/shared";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { GenericDescriptionComponent } from "src/app/shared/generic-description/generic-description.component";
import { CompanyApiService } from "yuzee-shared-lib";

@Component({
  selector: "app-editworkwithus",
  templateUrl: "./editworkwithus.page.html",
  styleUrls: ["./editworkwithus.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EditworkwithusPage extends CcBasePage implements OnInit {
  lifeText: string = "";
  innovativeText: string = "";
  studentText: string = "";
  internshipText: string = "";
  name: string = "";
  selectedText: string = "";
  selectedTitle: string = "";
  workWithUs: any[];
  isEdited = false;
  isEdit: boolean = false;
  _workWithUs: any[];
  constructor(
    injector: Injector,
    private companyAPI: CompanyApiService,
    private services: SharedService
  ) {
    super(injector);
  }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.workWithUs = [].concat(this._workWithUs);
    console.log(this.workWithUs);
    if (this.workWithUs) {
      this.workWithUs.forEach((element) => {
        switch (element.name) {
          case "LIFE":
            this.lifeText = element.description;
            console.log(this.lifeText);
            break;
          case "INTERNSHIP":
            this.internshipText = element.description;
            break;
          case "STUDENTS":
            this.studentText = element.description;
            break;
          case "INNOVATIVE_WORK":
            this.innovativeText = element.description;
          // eslint-disable-next-line no-fallthrough
          default:
            break;
        }
      });
    }
  }

  async dismiss(data = {}) {
    if (this.isEdited) {
      const res = await this.ccUtilityService.showConfirmPopOver();

      if (res) {
        this.ccModalService.dismiss(data);
      }
    } else {
      this.ccModalService.dismiss(data);
    }
  }

  edited($event) {
    if ($event.target.value !== " ") {
      this.isEdited = true;
    }
  }

  isSaveDisabled(){
    return !(this.innovativeText !== "" ||
    this.lifeText !== "" ||
    this.studentText !== "" ||
    this.internshipText !== "")
  }

  save() {
    if (
      this.innovativeText !== "" ||
      this.lifeText !== "" ||
      this.studentText !== "" ||
      this.internshipText !== ""
    ) {
      let work_with_us = {
        work_with_us: [
          {
            name: "LIFE",
            description: this.lifeText,
          },
          {
            name: "INNOVATIVE_WORK",
            description: this.innovativeText,
          },
          {
            name: "INTERNSHIP",
            description: this.internshipText,
          },
          {
            name: "STUDENTS",
            description: this.studentText,
          },
        ],
      };
      this.companyAPI
        .addCompanyWorkWithus(work_with_us, this.services.companyId)
        .then((res) => {
          if (res) {
            this.shared.companyDetailsChanged.next();
            this.ccModalService.dismiss(res);
          }
        });
    } else {
      this.ccUtilityService.showAlert("Please Fill At least one field to save");
    }
  }

  async delete() {
    const res = await this.ccModalService.present(
      GenericDeleteConfirmationComponent,
      {},
      "generic-alert-back-delete-modal generic-modal generic-model-backdrops"
    );

    if (res) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.companyAPI.deleteWorkWithUs(this.shared.companyId).then((res_) => {
        if (res) {
          this.shared.companyDetailsChanged.next();
          this.dismiss(res_);
        }
      });
    }
  }

  async openDescriptionModal(title, key) {
    let description = "";
    switch (key) {
      case "LIFE":
        description = this.lifeText;
        break;
      case "INTERNSHIP":
        description = this.internshipText;
        break;
      case "STUDENTS":
        description = this.studentText;
        break;
      case "INNOVATIVE_WORK":
        description = this.innovativeText;
        break;
      default:
        break;
    }
    this.name = key;
    const res = await this.ccModalService.present(GenericDescriptionComponent, {
      data: description,
      heading: title,
      maxLength: MAX_LENGTH.max
    }, 'modal-full-screen-view', '', 'md');
    if (res.data.isSaved) {
      if (res.data.data !== "") {
        this.isEdited = true;
        description = res.data.data;
        if (key == "LIFE") {
          this.lifeText = description;
        }
        if (key == "INTERNSHIP") {
          this.internshipText = description;
        }
        if (key == "STUDENTS") {
          this.studentText = description;
        }
        if (key == "INNOVATIVE_WORK") {
          this.innovativeText = description;
        }
      }
    }
  }
}
