import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyApiService } from "yuzee-shared-lib";
import { EditawardscertifcatesPage } from "../editawardscertifcates/editawardscertifcates.page";

@Component({
  selector: "app-see-all-awards",
  templateUrl: "./see-all-awards.component.html",
  styleUrls: ["./see-all-awards.component.scss"],
})
export class SeeAllAwardsComponent extends CcBasePage implements OnInit {
  awards: any[] = [];
  page = 1;
  limit = 1;
  constructor(injector: Injector, public companyAPI: CompanyApiService) {
    super(injector);
  }

  ngOnInit() {
    this.startSearch(false, true);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startSearch(paginate = false, isInit = false) {
    this.companyAPI
      .getCompanyAward(this.shared.companyId, this.page, 10)
      .then((res: any) => {
        const value = res.data.response;
        if (value.length !== 10) {
          this.limit = -1;
        }
        if (!paginate) {
          this.awards = [].concat(value);
        } else if (paginate) {
          this.awards = this.awards.concat(value);
        }
      });
  }

  loadMore($event) {
    if (this.limit !== -1) {
      this.page++;
      this.startSearch(true);
    }
    setTimeout(() => {
      $event.target.complete();
    }, 500);
  }

  async openAdd() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await this.ccModalService.present(EditawardscertifcatesPage);
    this.startSearch(false, true);
  }

  async editAward(item) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await this.ccModalService.present(EditawardscertifcatesPage, {
      _award: item,
    }, "modal-full-screen-view", "right", "md");
    this.startSearch(false, true);
  }

  dismiss() {
    this.ccModalService.dismiss();
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
