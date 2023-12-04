/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, Injector, ViewChild } from "@angular/core";
import { StorageApiService } from "yuzee-shared-lib";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import type { IonInput } from "@ionic/angular";
import { CompanyHelperService } from "src/app/services/company-helper.service";

@Component({
  selector: "app-abn-varification",
  templateUrl: "./abn-varification.component.html",
  styleUrls: ["./abn-varification.component.scss"],
})
export class ABNVarificationComponent extends CcBasePage {
  abnNumber: any = "";
  inputModel = "";

  constructor(
    public ccHelper: CompanyHelperService,
    injector: Injector,
    public camera: Camera,
    public storageApi: StorageApiService
  ) {
    super(injector);
  }
  @ViewChild("ionInputEl", { static: true }) ionInputEl!: IonInput;

  dismiss() {
    this.ccModalService.dismiss();
  }

  // CAPTURING PHOTO AND CONVERTING INTO BASE64
  async captureImage(sourceType: number) {
    // CAMERA OPTIONS
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // eslint-disable-next-line object-shorthand
      sourceType: sourceType,
    };
    let image = null;
    return new Promise((resolve, reject) => {
      this.camera.getPicture(options).then(
        (imageData) => {
          image = "data:image/jpeg;base64," + imageData;
          resolve(image);
        },
        (err) => {
         
          reject(null);
        }
      );
    });
  }

  // UPLOADING PHOTO TO SERVER
  async uploadEntityType(entityObj) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", entityObj[0].file);
      formData.append("entity_id",   this.shared.companyId);
      formData.append("entity_type", "COMPANY");
      formData.append("entity_sub_type", "ABN_CERTIFICATE");
      this.storageApi
        .uploadEntity(formData)
        .then((result: any) => {
          resolve(result);
          
        })
        .catch((err) => {
          reject(err);
         
        });
    });
  }

  async uploadEntityType2(entityObj) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", entityObj[0].file);
      formData.append("entity_id",   this.shared.companyId);
      formData.append("entity_type", "COMPANY");
      formData.append("entity_sub_type", "PERSONAL_IDENTITY");
      this.storageApi
        .uploadEntity(formData)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // FETCHING IMAGES FROM SERVER
  async getImages(entity) {
    this.storageApi
      .getUploadedEntity(entity)
      .then((res) => {
      })
      .catch((err) => {
      });
  }
  async submit() {
    if (this.inputModel != "") {
      await this.ccHelper.addUpdateCompanyAbnVarification({abn_registration_number:this.inputModel}).then(
        (data: any) => {
          this.dismiss();
        },
        (err) => {
        }
      );
    }
  }

  onInput(ev) {
    const value = ev.target!.value;

    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, "");

 
    this.ionInputEl.value = this.inputModel = filteredValue;
  }
}
