import { Injectable } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
import { StorageApiService } from "yuzee-shared-lib";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Platform } from "@ionic/angular";
//const imagefile = require("./image.json");
@Injectable({
  providedIn: "root",
})
export class CcPhotosService {
  _companyLogo: string = null;
  logoPath: string = null;
  companyId: string = "e925e703-a343-11eb-aa8b-06d265b5be0a";
  entityObj: any = {};
  lang: string;

  options: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: 2,
  };
  constructor(
    private camera: Camera,
    public storageApiService: StorageApiService,
    public shared: SharedService,
    public platform: Platform
  ) {}

  checkIfBase64String(res){
    return res.includes(";base64,");
  }

  takeLogoPhoto(isCompanyLogo = true) {
    return new Promise<any>((resolve) => {

      // check if platform is web
      if(this.platform.is('cordova')){

        this.camera.getPicture(this.options).then((imageData) => {
          let base64Image = "data:image/jpeg;base64," + imageData;
          if (isCompanyLogo) {
            this._companyLogo = base64Image;
            this.shared.setCompanyLogoPhoto(base64Image);
          }
          resolve(base64Image);
        });

      }
    });
  }

  uploadLogo() {
    this.shared.getIsCompanyCreated().subscribe((res) => {
      if (res) {
        //true
        this.shared.uploadEntityType(this.entityObj);
      }
    });
  }

  uploadEntityType(entityObj) {
    const formData = new FormData();
    formData.append("file_base64", entityObj.fileUpload);
    formData.append("entity_id", entityObj.entity_id);
    formData.append("entity_type", entityObj.entity_type);
    formData.append("entity_sub_type", entityObj.entity_sub_type);
    this.storageApiService
      .uploadEntity(formData)
      .then((result: any) => {
      })
      .catch((err) => {
      });
  }
}
