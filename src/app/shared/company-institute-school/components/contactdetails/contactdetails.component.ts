import { Component, Injector, Input, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyContactSeeAllListComponent } from "./company-contact-see-all-list/company-contact-see-all-list.component";
import { CommonApiService } from "yuzee-shared-lib";
import { SharedService } from "src/app/services/shared.service";
import { AppGenericService } from "src/services/generic.service";
@Component({
  selector: "app-contactdetails",
  templateUrl: "./contactdetails.component.html",
  styleUrls: ["./contactdetails.component.scss"],
})
export class ContactdetailsComponent extends CcBasePage implements OnInit {
  @Input("isInstitute") isInstitute;
  @Input() hasAccessUpdate;
  private = true;
  instituteId;
  subsData;
  userInfo;
  hide: boolean = false;
  loading: boolean = false;
  contacts: any[] = [];
  isEmpty: boolean = false;
  website: string;
  contactList: any;
  constructor(
    injector: Injector,
    private appGenericService: AppGenericService,
    private commonApiService: CommonApiService,
    public sharedService: SharedService) {
    super(injector);

  }

  ngOnInit() {

    if (this.isInstitute) {
      this.appGenericService.getComponentData().subscribe((res) => {
        if (res !== null && res === 'added') {
          this.subsData = true;
          this.getContactDetailsInstitute();
          this.appGenericService.updateComponentData(null);
        }
      });
      this.getContactDetailsInstitute();
    } else {

      this.shared.companyContactDetailsFetched.subscribe((res) => {
        this.getContactDetails(res);
      });
    }

  }

  getContactDetails(res) {

    this.contacts = res.data.map((x) => {

      let name = this.ccStringService.capitalizeEachFirst(String(x.contact_type).split("_").join(" "))
      let obj = {
        contact_detail_id: x.contact_detail_id ?? null,
        name,
        value: x.value,
        privacy_level: "PUBLIC",
        icon: this.ccStringService.translateNameIntoIconContactArray(name)
      };
      return obj;

    });
  }

  getContactDetailsInstitute() {
    this.commonApiService.getContactDetails('INSTITUTE', this.sharedService.instituteId).then(
      (data: any) => {
        if (data != undefined) {
          this.contacts = data.data.response;
          this.contacts.forEach(element => {
            let name = this.ccStringService.capitalizeEachFirst(String(element.contact_type).split("_").join(" "))
            element.contact_type = name;
          });
          if (this.subsData == true) {
            this.appGenericService.updateProfileData("updatedStatus");
          }
        }
      }
    );
  }

  seemore() {
    this.ccModalService.present(CompanyContactSeeAllListComponent);
  }

}
