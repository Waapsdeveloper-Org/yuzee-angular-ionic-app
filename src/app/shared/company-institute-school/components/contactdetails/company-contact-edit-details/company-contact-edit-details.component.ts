import { Component, Injector, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CommonApiService, CompanyApiService } from "yuzee-shared-lib";
import { AboutUsService } from "../../../../../../services/aboutUs-service";
import { ContactTypeSelectComponent } from "../contact-type-select/contact-type-select.component";
import { CountryCodeList } from "src/constants/country-codes";
import { DeleteConfirmationComponent } from "../../../../../company/shared/delete-confirmation/delete-confirmation.component";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
@Component({
  selector: "app-company-contact-edit-details",
  templateUrl: "./company-contact-edit-details.component.html",
  styleUrls: ["./company-contact-edit-details.component.scss"],
})
export class CompanyContactEditDetailsComponent
  extends CcBasePage
  implements OnInit
{
  typeArray = [
    {
      name: "Email",
      icon: "Icon material-email",
    },
    {
      name: "Phone",
      icon: "Icon awesome-phone-alt",
    },
    {
      name: "Skype",
      icon: "Skype",
    },
    {
      name: "Website",
      icon: "www",
    },
    {
      name: "WhatsApp",
      icon: "whatsapp",
    },
    {
      name: "Google Hangout",
      icon: "message",
    },
    {
      name: "IMO",
      icon: "imo",
    },
    {
      name: "Kakao Talk",
      icon: "Path 15886",
    },
    {
      name: "Kik Messenger",
      icon: "kik",
    },
    {
      name: "Line",
      icon: "Line",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
    },
    {
      name: "Messenger",
      icon: "Messenger",
    },
    {
      name: "Tango",
      icon: "Mask Group 56",
    },
    {
      name: "Telegram",
      icon: "telegram",
    },
    {
      name: "Tik Tok",
      icon: "Path 15880",
    },
    {
      name: "Viber",
      icon: "call",
    },
    {
      name: "WeChat",
      icon: "Group 95503",
    },
    {
      name: "Yabb Messenger",
      icon: "yabb",
    },
  ];
  privacy_level: any = "PRIVATE";
  totalItem: any = [];
  _totalItem: any = [];
  showTo = "Public";
  showClose: boolean = false;
  isAddDisabled: boolean = true;
  canSubmit: boolean = false;
  emailValid: boolean = null;
  websiteValid: boolean = false;
  submitted: boolean = false;
  countryCode: any = [];
  selectedCode: any;
  constructor(
    injector: Injector,
    private companyApi: CompanyApiService,
    private contactServices: AboutUsService,
    private modalCtrl: ModalController,
    private commonAPI: CommonApiService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.countryCode = CountryCodeList.countryCodes;
    if (this._totalItem.length > 0) {
      this.totalItem = [].concat(this._totalItem);
      this.totalItem.forEach((element) => {
        if (
          element["contact_type"] == "Email" ||
          element["contact_type"] == "EMAIL"
        ) {
          this.emailValid = this.ccStringService.isValidEmail(element["value"]);
        } else if (
          element["contact_type"] == "Website" ||
          element["contact_type"] == "WEBSITE"
        ) {
          this.websiteValid = this.ccStringService.isValidUrl(element["value"]);
        }
      });
    } else {
      this.totalItem.push({
        contact_type: "",
        privacy_level: "PUBLIC",
        value: "",
      });
    }
    this.enableDisable();
  }

  async openTypePopUp(i) {
    const indices = this.totalItem
      .filter((x) => x.contact_type !== "")
      .map((x) => {
        const type = x.contact_type ? x.contact_type : "";
        return this.typeArray.findIndex(
          (d) => d.name.toUpperCase().split(" ").join("_") === type
        );
      });

    const modal = await this.modalCtrl.create({
      componentProps: {
        data: this.typeArray,
        type: "type",
        title: "Type",
        disableIndexes: indices,
        selectedData: this.totalItem[i],
      },
      component: ContactTypeSelectComponent,
      cssClass:
        "generic-large-popup-modal generic-modal generic-model-backdrops",
    });
    modal.onDidDismiss().then((data) => {
      this.canSubmit = true;
      if (data?.data?.data) {
        const res = data?.data?.data;
        this.totalItem[i].contact_type = res.name;
      }
    });
    return await modal.present();
  }

  addValue(i, value) {
    this.totalItem[i].value = value;
  }

  addTemplate() {
    this.enableDisable();
    if (this.isAddDisabled) {
      return;
    }
    this.totalItem.push({
      contact_type: "",
      privacy_level: "PUBLIC",
      value: "",
    });
  }

  getFormattedValue(value) {
    String(value).split(" ").join("_");
    const string = this.ccStringService.capitalizeEachFirst(value);
    return string;
  }

  async saveContactDetails() {
    this.submitted = true;
    const index = this.totalItem.findIndex(
      (x: any) => x.value == "" || x.value == null
    );
    if (this.emailValid == false) {
      return;
    }
    if (this.websiteValid == false) {
      return;
    }
    if (index !== -1) {
      return;
    }
    let arr = this.totalItem;
    arr = this.totalItem.map((x) => {
      let obj = {
        contact_detail_id: x.contact_detail_id ?? null,
        contact_type: String(x.contact_type).toUpperCase().split(" ").join("_"),
        value: x.value,
        privacy_level: x.privacy_level ?? "PUBLIC",
      };
      return obj;
    });

    let companyId = this.shared.companyId;
    this.companyApi
      .postCompanyContactDetails(companyId, arr)
      .then((res: any) => {
        this.contactServices.contactDetails = arr;

        this.totalItem = [];
        this.shared.companyDetailsChanged.next();
        this.ccModalService.dismiss();
      });
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

  enableDisable() {
    const lastElement = this.totalItem.length - 1;
    const lastItem = this.totalItem[lastElement];

    const isEmpty =
      lastItem.contact_type == "" ||
      lastItem.contact_type == null ||
      lastItem.value == "" ||
      lastItem.value == null
        ? true
        : false;
    if (isEmpty) {
      this.isAddDisabled = true;
      return;
    } else {
      this.isAddDisabled = false;
    }
  }

  remove(index) {
    this.totalItem.splice(index, 1);
    this.canSubmit = true;
    this.enableDisable();
  }

  async delete() {
    const res = await this.ccModalService.present(
      DeleteConfirmationComponent,
      {},
      "generic-small-popup-modal generic-modal generic-model-backdrops"
    );
    const item = this.totalItem.filter(
      (x) => x.contact_type == "Website" || x.contact_type == "WEBSITE"
    );
    if (res) {
      this.companyApi
        .postCompanyContactDetails(this.shared.companyId, item)
        .then((res) => {
          this.shared.companyDetailsChanged.next();
          this.ccModalService.dismiss();
        });
    }
  }

  getShowClose(i) {
    return i !== 0;
  }

  keydown() {
    this.canSubmit = true;
  }

  getIcon(item) {
    const name = this.getFormattedValue(item.contact_type);
    const icon_item = this.typeArray.filter((x) => x.name == name);
    return icon_item[0] ? icon_item[0]["icon"] : "";
  }

  getLabel(type) {
    if (type == "Phone" || type == "PHONE") {
      return "Phone Number";
    } else {
      return "Contact";
    }
  }

  performValidations($event, contact_type) {
    if (contact_type == "Phone" || contact_type == "PHONE") {
      $event.target.value = this.ccStringService.getOnlyDigits(
        $event.target.value
      );
    } else if (contact_type == "Email" || contact_type == "EMAIL") {
      this.emailValid = this.ccStringService.isValidEmail($event.target.value);
      if (this.emailValid) {
      }
    } else if (contact_type == "Website" || contact_type == "WEBSITE") {
      this.websiteValid = this.ccStringService.isValidUrl($event.target.value);
    }
  }

  stopWhiteSpace($event) {
    let e = <KeyboardEvent>$event;
    if (e.code === "Space") {
      e.preventDefault();
    }
  }

  validatePhoneNumber($event) {
    let e = <KeyboardEvent>$event;
    if (e.code === "KeyE") {
      e.preventDefault();
    }
  }
}
