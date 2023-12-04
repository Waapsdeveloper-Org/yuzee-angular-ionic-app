import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyApiService } from "yuzee-shared-lib";
import { CompanyContactEditDetailsComponent } from "../company-contact-edit-details/company-contact-edit-details.component";
@Component({
  selector: "app-company-contact-see-all-list",
  templateUrl: "./company-contact-see-all-list.component.html",
  styleUrls: ["./company-contact-see-all-list.component.scss"],
})
export class CompanyContactSeeAllListComponent
  extends CcBasePage
  implements OnInit
{
  contactDetails;
  contactList: any[] = [];
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
      name: "Enquiry",
      icon: "raise-your-hand-to-ask",
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
    {
      name: "Other",
      icon: "Group 44024",
    },
  ];
  constructor(injector: Injector, private companyAPI: CompanyApiService) {
    super(injector);
  }

  ngOnInit() {
    this.getContactDetails();
  }

  dismiss() {
    this.ccModalService.dismiss();
  }

  getContactDetails() {
    this.companyAPI
      .getCompanyContactDetails(this.shared.companyId)
      .then((res) => {
        this.contactDetails = res["data"];
      });
  }

  edit() {
    this.ccModalService.present(CompanyContactEditDetailsComponent, {
      _totalItem: this.contactDetails,
    });
  }
  getFormattedValue(value) {
    String(value).split(" ").join("_");
    const string = this.ccStringService.capitalizeEachFirst(value);
    return string;
  }

  getIcon(item) {
    const name = this.getFormattedValue(item.contact_type);
    const icon_item = this.typeArray.filter((x) => x.name == name);
    if (!icon_item[0]) {
      return "";
    }
    return icon_item[0]["icon"];
  }
}
