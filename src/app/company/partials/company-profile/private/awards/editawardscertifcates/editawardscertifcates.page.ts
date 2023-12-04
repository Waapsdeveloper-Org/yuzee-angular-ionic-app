import { Component, Injector, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { log } from "console";
import { MAX_LENGTH } from "src/app/app.constants";

import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { GenericDeleteConfirmationComponent } from "src/app/shared/generic-delete-confirmation/generic-delete-confirmation.component";
import { GenericDescriptionComponent } from "src/app/shared/generic-description/generic-description.component";
import { CompanyApiService } from "yuzee-shared-lib";

@Component({
  selector: "app-editawardscertifcates",
  templateUrl: "./editawardscertifcates.page.html",
  styleUrls: ["./editawardscertifcates.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EditawardscertifcatesPage extends CcBasePage implements OnInit {
  _award: any = {
    description: "",
    logo: null,
    privacy_level: "PRIVATE",
    title: "",
  };
  award: any;
  submitted: boolean = false;
  canSubmit: boolean = false;
  titleValidated: boolean = true;
  titleValid: boolean = false;
  constructor(injector: Injector, private companyAPI: CompanyApiService, public platform: Platform) {
    super(injector);
  }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.award = this.shared.clone(this._award);
    this.award.logo = this.getImageUrlToShow();
  }

  keydown() {
    this.canSubmit = true;
  }

  async dismiss() {
    if (this.canSubmit) {
      const res = await this.ccUtilityService.showConfirmPopOver();

      if (res) {
        this.ccModalService.dismiss();
      }
    } else {
      this.ccModalService.dismiss();
    }
  }

  selectPhoto() {
    this.ccLogoService.takeLogoPhoto().then((res) => {
      this.canSubmit = true;
      this.award.logo = res;
    });
  }

  async openDescriptionModal() {
    const res = await this.ccModalService.present(GenericDescriptionComponent, {
      data: this.award.description,
      heading: "Description",
      minLength: MAX_LENGTH.min,
      maxLength: MAX_LENGTH.max,
    }, 'modal-full-screen-view', '', 'md');
    if (res?.data?.isSaved) {
      if (res?.data?.data !== "") {
        this.canSubmit = true;
        this.award.description = res.data.data;
      }
      
    }
  }
  getIfCanSubmit() {
    let checkPoint = [this.award.title, this.award.description];
    return checkPoint.every(this.shared.isFilled);
  }

  edit1() {
    this.titleValid = true;
  }
  save() {
    this.submitted = true;
    if (
      !this.award.title ||
      this.award.title == "" ||
      !this.award.description ||
      this.award.description == "" ||
      !this.titleValidated
    ) {
      return;
    }
    this.award.title = this.award.title.trim();
    this.award.description = this.award.description.trim();

    let obj = Object.assign({}, this.award);
    // remove default logo if appears
    if (obj.logo) {
      if (obj.logo == "assets/create-company/camera.svg") {
        obj.logo = null;
      }
    }

    if (!obj.award_certification_id) {
      this.companyAPI
        .postCompanyAwards(obj, this.shared.companyId)
        .then(async (res: any) => {
          if (res.status == 200) {
            // check if logo is in base64
            const resp = await this.uploadLogo(
              obj,
              res.data.award_certification_id
            );
            this.shared.companyDetailsChanged.next(Date.now());
            this.ccModalService.dismiss({ data: true });
          }
        });
    } else {
      this.companyAPI
        .updateCompanyAwards(
          obj,
          this.shared.companyId,
          obj.award_certification_id
        )
        .then(async (res: any) => {
          if (res.status == 200) {
            await this.uploadLogo(obj, obj.award_certification_id);
            this.shared.companyDetailsChanged.next(Date.now());
            this.ccModalService.dismiss({ data: true });
          }
        });
    }
  }

  uploadLogo(object, award_certification_id) {
    return new Promise((resolve) => {
      if (object.logo) {
        if (this.ccLogoService.checkIfBase64String(object.logo)) {
          const obj = {
            fileUpload: object.logo,
            entity_type: "COMPANY",
            entity_sub_type: "COMPANY_AWARD_CERTIFICATION_LOGO",
            entity_id: award_certification_id,
          };

          this.shared.uploadEntityType(obj).then((res) => {
            resolve(res);
          });
        }
      } else {
        resolve(null);
      }
    });
  }

  validateQuestion() {
    this.titleValidated =
      this.award.title.length > 220 || this.award.title.length < 2
        ? false
        : true;
  }

  async delete() {
    const res = await this.ccModalService.present(
      GenericDeleteConfirmationComponent,
      {},
      "generic-alert-back-delete-modal generic-modal generic-model-backdrops"
    );
    if (res) {
      this.companyAPI
        .deleteAward(this.shared.companyId, this.award.award_certification_id)
        .then((_res) => {
          this.shared.companyDetailsChanged.next();
          this.ccModalService.dismiss();
        });
    }
  }

  getImageUrlToShow() {
    if (this.award.award_certification_id) {
      if (this.award.storage) {
        if (this.award.storage.length > 0) {
          return this.award.storage[0].file_url;
        }
      }
    }
    return "assets/create-company/camera.svg";
  }
}
