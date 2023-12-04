/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { CompanyApiService } from "yuzee-shared-lib";
import { EditAchievementsComponent } from "../edit-achievements/edit-achievements.component";
import { CompanyHelperService } from "src/app/services/company-helper.service";

@Component({
  selector: "app-see-all-achievements",
  templateUrl: "./see-all-achievements.component.html",
  styleUrls: ["./see-all-achievements.component.scss"],
})
export class SeeAllAchievementsComponent extends CcBasePage implements OnInit {
  achievements: any[] = [];


  page = 1;
  hide: boolean = true;
  limit = 1;
  constructor(injector: Injector, public companyAPI: CompanyApiService, public ccHelperService: CompanyHelperService) {
    super(injector);

    this.shared.companyAchievementsFetched.subscribe((res) => {
      this.getAchievements(res.data);
    });

    this.ccHelperService.getCompanyAchievement().then( res => {
      this.getAchievements(res)
    });
  }

  ngOnInit() {
    this.startSearch(false, true);
  }

  getAchievements(data) {
    let array = data.response;

    if (array && array.length > 0) {
      this.hide = false;
      array.forEach((element) => {
        element.itemExpanded = false;
      });
      this.achievements = array;
      this.achievements = this.shared.sortArrayByDate(this.achievements);
    } else {
      this.hide = true;
    }
  }

  startSearch(paginate = false, isInit = false) {
    this.companyAPI
      .getCompanyAchievement(this.shared.companyId, this.page, 100)
      .then((res: any) => {
        const value = res.data.response;
        if (value) {
          if (value.length !== 10) {
            this.limit = -1;
          }
          value.forEach((element) => {
            element.itemExpanded = false;
            if (element.user_info.length > 0) {
              element.user_info = this.shared.sortByKey(
                element.user_info,
                "first_name"
              );
            }
          });
        
          if (!paginate) {
          } else if (paginate) {     
          }
      
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
  expandView(i) {
    const openedIndex = this.achievements.findIndex(
      (x) => x.itemExpanded == true
    );
    if (openedIndex !== -1) {
      this.achievements[openedIndex].itemExpanded = false;
      if (openedIndex !== i) {
        this.achievements[i].itemExpanded = true;
      }
    } else {
      this.achievements[i].itemExpanded = true;
    }
  }

  async openAdd() {
    const res = await this.ccModalService.present(EditAchievementsComponent, {}, "modal-full-screen-view", "right", "md");
    this.startSearch(false, true);
  }

  async editAchievements(item) {
    const res = await this.ccModalService.present(EditAchievementsComponent, {
      _companyAchievement: item,
    }, "modal-full-screen-view", "right", "md");
    this.startSearch(false, true);
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

  seeMore() {
    this.ccModalService.present(SeeAllAchievementsComponent);
  }

  dismiss() {
    this.ccModalService.dismiss();
  }

  visibleAttachmentHeading(item) {
    if (item && item.storage && item.storage.length > 0) {
      return false;
    }

    return true;
  }
}
