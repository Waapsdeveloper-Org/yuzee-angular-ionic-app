import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { EditawardscertifcatesPage } from "./editawardscertifcates/editawardscertifcates.page";
import { SeeAllAwardsComponent } from "./see-all-awards/see-all-awards.component";
@Component({
  selector: "app-awards",
  templateUrl: "./awards.component.html",
  styleUrls: ["./awards.component.scss"],
})
export class AwardsComponent extends CcBasePage implements OnInit {
  isAwardEmpty: boolean = true;
  awards: any[];
  itemList = [
    {
      title: "Adobe Certification",
      icon: "adobe-cert",
      desc: "Lorem ipsum dolor sit amet, at salutatus necessitatibus quo, eis has. Ad sanctus delenit debitis mel. Lorem ipsum dolor sit amet, at salu quo.",
    },
    {
      title: "IECA Certification",
      icon: "adobe-cert",
      desc: "Lorem ipsum dolor sit amet, at salutatus necessitatibus quo, eis has. Ad sanctus delenit debitis mel. Lorem ipsum dolor sit amet, at salu quo.",
    },
  ];
  hide: boolean = true;
  allAwards: any = [];
  constructor(injector: Injector) {
    super(injector);
    this.shared.companyAwardsFetched.subscribe((res) => {
      this.getCompanyAwards(res);
    });
  }

  ngOnInit() {}

  getCompanyAwards(res) {
    if (res.data.response.length > 0) {
      this.awards = res.data.response;
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  async openAdd() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await this.ccModalService.present(EditawardscertifcatesPage, {}
      , "modal-full-screen-view", "right", "md");
  }

  async editAward(item) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await this.ccModalService.present(EditawardscertifcatesPage, {
      _award: item,
    }, "modal-full-screen-view", "right", "md");
  }

  seeMore() {
    this.ccModalService.present(SeeAllAwardsComponent, {}, "modal-full-screen-view", "right", "md");
  }

  getImageUrlToShow(item) {
    if (item.award_certification_id) {
      if (item.storage) {
        if (item.storage.length > 0) {
          return item.storage[0].file_url;
        }
      }
    }
    return 'assets/imgs/application/svg/default-picture/default-institute.svg';
  }
}
