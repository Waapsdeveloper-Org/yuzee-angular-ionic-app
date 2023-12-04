import {
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { MAX_LENGTH } from 'src/app/app.constants';

import { SharedService } from 'src/app/services/shared.service';
import { CcBasePage } from 'src/app/shared/cc-base-page/cc-base-page';
import { GenericDeleteConfirmationComponent } from 'src/app/shared/generic-delete-confirmation/generic-delete-confirmation.component';
import { GenericDescriptionComponent } from 'src/app/shared/generic-description/generic-description.component';
import {
  CompanyApiService,
  StorageApiService,
} from 'yuzee-shared-lib';

import { SearchPeopleComponent } from '../search-people/search-people.component';

@Component({
  selector: "app-edit-achievements",
  templateUrl: "./edit-achievements.component.html",
  styleUrls: ["./edit-achievements.component.scss"],
})
export class EditAchievementsComponent extends CcBasePage implements OnInit {
  qualificationList = { privacy_level: "PRIVATE" };
  editPopUpModal: any;
  canSubmit: boolean = false;
  newDocObj: any = {};
  documentList: any = [];
  documentRemoveList: any = [];
  companyAchievement: any = {};
  _companyAchievement: any = {
    privacy_level: "PUBLIC",
    achievement_name: "",
    achievement_description: "",
    achievement_start_date: "",
    taged_user_id: [],
    user_info: [],
    storage: [],
  };
  titleValidated: boolean = false;
  submitted: boolean = false;
  currentDate = new Date().toISOString();

  constructor(
    injector: Injector,
    public storageApiService: StorageApiService,
    private companyApi: CompanyApiService,
    public shared: SharedService
  ) {
    super(injector);
  }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.companyAchievement = this.shared.clone(this._companyAchievement);
  }

  getIfCanSubmit() {
    let checkPoint = [
      this.companyAchievement.achievement_name,
      this.companyAchievement.achievement_description,
      this.companyAchievement.achievement_start_date,
    ];
    return checkPoint.every(this.shared.isFilled);
  }

  save() {
    this.submitted = true;
    if (
      !this.companyAchievement.achievement_name ||
      this.companyAchievement.achievement_name == "" ||
      !this.companyAchievement.achievement_description ||
      this.companyAchievement.achievement_description == "" ||
      !this.companyAchievement.achievement_start_date ||
      this.companyAchievement.achievement_start_date == ""
    ) {
      return;
    }

    this.companyAchievement.achievement_description =
      this.companyAchievement.achievement_description.trim();
    this.companyAchievement.achievement_name =
      this.companyAchievement.achievement_name.trim();
    if (!this.companyAchievement.company_achievement_id) {
      this.companyApi
        .postCompanyAchievement(this.companyAchievement, this.shared.companyId)
        .then((res: any) => {
          if (res.status == 200) {
            let achieve_id = res.data.company_achievement_id;
            if (this.documentList.length != 0) {
              const lastItem = this.documentList[this.documentList.length - 1];
              this.documentList.forEach((element) => {
                this.uploadDocs(element.file, achieve_id, lastItem);
              });
            } else {
              this.ccModalService.dismiss();
              this.shared.companyDetailsChanged.next();
            }
          }
        });
    } else {
      this.companyApi
        .updateCompanyAchievement(
          this.companyAchievement,
          this.shared.companyId,
          this.companyAchievement.company_achievement_id
        )
        .then((res: any) => {
          if (res.status == 200) {
            this.shared.companyDetailsChanged.next();
            let achieve_id = res.data.company_achievement_id;
            this.removeUploadedDocs();
            if (this.documentList.length != 0) {
              const lastItem = this.documentList[this.documentList.length - 1];
              this.documentList.forEach((element) => {
                this.uploadDocs(element.file, achieve_id, lastItem);
              });
            } else {
              this.ccModalService.dismiss();
              this.shared.companyDetailsChanged.next();
            }
          }
        });
    }
  }

  validateQuestion() {
    this.titleValidated =
      this.companyAchievement.achievement_name.length > 220 ||
      this.companyAchievement.achievement_name.length < 2
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
      this.companyApi
        .deleteCompanyAchievement(
          this.shared.companyId,
          this.companyAchievement.company_achievement_id
        )
        .then((_res) => {
          this.shared.companyDetailsChanged.next();
          this.ccModalService.dismiss();
        });
    }
  }

  removeUserFromList(user) {
    const index = this.companyAchievement.user_info.findIndex(
      (x) => x.id == user.id
    );
    const tagged_index = this.companyAchievement.taged_user_id.findIndex(
      (x) => x.id == user.id
    );
    if (index !== -1) {
      this.canSubmit = true;
      this.companyAchievement.user_info.splice(index, 1);
    }
    if (tagged_index !== -1) {
      this.canSubmit = true;
      this.companyAchievement.taged_user_id.splice(tagged_index, 1);
    }
  }

  uploadDocs(file, entity_id, lastItem) {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formData.append("file", file);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formData.append("entity_id", entity_id);
    formData.append("entity_type", "COMPANY");
    formData.append("entity_sub_type", "COMPANY_ACHIEVEMENT_CERTIFICATES");
    this.storageApiService
      .uploadEntity(formData)
      .then((storage: any) => {
        if (lastItem.file == file) {
          this.ccModalService.dismiss();
          this.shared.companyDetailsChanged.next();
        }
      })
      .catch((err) => {});
  }

  removeUploadedDocs() {
    if (this.documentRemoveList.length > 0) {
      this.documentRemoveList.forEach((element) => {
        this.storageApiService
          .deleteEntity(element.stored_file_name)
          .then((res) => {
            if (res) {
            }
          });
      });
    }
  }

  async openPeopleModal() {
    const res = await this.ccModalService.present(SearchPeopleComponent, {
      _selected_data: this.companyAchievement.user_info,
    }, "modal-full-screen-view", "", "md");
    if (res?.data?.selected.length !== 0) {
      const selected = res?.data?.selected;
      if (res?.data?.changed) {
        let array = [];
        let user_ids = [];
        this.canSubmit = true;
        selected.forEach((element) => {
          array.push(element);
          user_ids.push(element.id);
        });
        this.companyAchievement.user_info = array;
        this.companyAchievement.user_info = this.shared.sortByKey(
          this.companyAchievement.user_info,
          "first_name"
        );
        this.companyAchievement.taged_user_id = user_ids;
      }
    }
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

  async openDescriptionModal() {
    const res = await this.ccModalService.present(GenericDescriptionComponent, {
      data: this.companyAchievement.achievement_description,
      heading: "Description",
      minLength: MAX_LENGTH.min,
      maxLength: MAX_LENGTH.max,
    }, 'modal-full-screen-view', '', 'md');
    if (res.data.isSaved) {
      if (res.data.data !== "") {
        this.companyAchievement.achievement_description = res.data.data;
        this.canSubmit = true;
      }
    }
  }

  remove(certificate) {
    const index = this.documentList.findIndex(
      (x) => x.original_file_name == certificate.original_file_name
    );
    if (index !== -1) {
      this.canSubmit = true;
      this.documentList.splice(index, 1);
    }
  }

  removeAddedDoc(certificate) {
    const index = this.companyAchievement.storage.findIndex(
      (x) => x.original_file_name == certificate.original_file_name
    );
    if (index !== -1) {
      this.canSubmit = true;
      const item = this.companyAchievement.storage.splice(index, 1);
      this.documentRemoveList.push(item[0]);
    }
  }

  uploadHandler(files, input) {
    this.canSubmit = true;
    for (const file of files) {
      this.newDocObj.original_file_name = file.name;
      this.newDocObj.file = file;
      const extentions = file.name.split(".");
      this.newDocObj.file_type = extentions[1];
      this.documentList.push(this.newDocObj);
      this.newDocObj = {};
    }
    input.value = "";
  }

  keydown() {
    this.canSubmit = true;
  }

  getImageFromExtension(extention) {
    let ex = extention;
    switch (extention) {
      case "jpg":
      case "png":
      case "jpeg":
      case "gif":
        ex = "image";
        break;
      case "doc":
      case "docx":
        ex = "doc";
        break;
      case "xls":
      case "xlsx":
        ex = "xlsx";
        break;
    }

    return "assets/imgs/docx-icon/" + ex + ".png";
  }
}
