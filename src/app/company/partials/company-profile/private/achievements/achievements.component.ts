import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { EditAchievementsComponent } from "./edit-achievements/edit-achievements.component";
import { SeeAllAchievementsComponent } from "./see-all-achievements/see-all-achievements.component";
@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.scss"],
})
export class AchievementsComponent extends CcBasePage implements OnInit {
  itemExpanded = false;
  itemExpandedSec = false;
  isAchievementLoaded: boolean = false;
  isAchievementEmpty: boolean = true;
  pageNumber: 1;
  pageSize: 10;
  achievements = [
    {
      title: "UAE Most Innovative Business Advisory Firm 2017",
      date: "21/12/2020",
      itemExpanded: false,
    },
    {
      title: "UAE Most Innovative Business Advisory Firm 2017",
      date: "21/12/2020",
      itemExpanded: false,
    },
  ];
  images = [
    "../../../../assets/company-profile/Ellipse 278.png",
    "../../../../assets/company-profile/Ellipse 279.png",
    "../../../../assets/company-profile/Ellipse 1.png",
  ];
  hide: boolean = true;
  names = ["Ashlynn Ella", "Lizzie Hearts"];
  constructor(injector: Injector) {
    super(injector);
    this.shared.companyAchievementsFetched.subscribe((res) => {
      this.getAchievements(res.data);
      
      
      
    });
  }

  ngOnInit() {}

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

  expandViewSec() {
    this.itemExpandedSec = !this.itemExpanded;
  }

  addAchievements() {
    this.ccModalService.present(EditAchievementsComponent, {}, "modal-full-screen-view", "right", "md");
  }

  editAchievements(item) {
    this.ccModalService.present(EditAchievementsComponent, {
      _companyAchievement: item,
    }, "modal-full-screen-view", "right", "md");
  }

  getImageFromExtension(extention) {
    if (extention === "doc" || extention === "docx") {
      return "assets/imgs/docx-icon/doc.png";
    } else if (extention === "ppt") {
      return "assets/imgs/docx-icon/ppt.png";
    } else if (extention === "xlsx" || extention === "xls") {
      return "assets/imgs/docx-icon/xlsx.png";
    } else if (extention === "pdf") {
      return "assets/imgs/docx-icon/pdf.png";
    } else if (extention === "txt") {
      return "assets/imgs/docx-icon/txt.png";
    } else if (
      extention === "png" ||
      extention === "jpg" ||
      extention === "jpeg" ||
      extention === "gif"
    ) {
      return "assets/imgs/docx-icon/image.png";
    }
  }

  seeMore() {
    this.ccModalService.present(SeeAllAchievementsComponent, {}, "modal-full-screen-view", "right", "md");
  }
}
