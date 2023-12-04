import { Component, Injector, OnInit } from "@angular/core";
import { CcBasePage } from "src/app/shared/cc-base-page/cc-base-page";
import { EditworkwithusPage } from "./editworkwithus/editworkwithus.page";
import { leaveToRightAnimation } from "src/app/shared/page-transitions/page-leave-transition";
import { enterFromRightAnimation } from "src/app/shared/page-transitions/page-enter-transition";
import { ModalController } from "@ionic/angular";
@Component({
  selector: "app-workwithus",
  templateUrl: "./workwithus.component.html",
  styleUrls: ["./workwithus.component.scss"],
})
export class WorkwithusComponent extends CcBasePage implements OnInit {
  notSelected: boolean = false;
  isWorkEmpty: boolean = true;
  isWorkLoaded: boolean = false;
  selectedTab: string = "";
  hideWorkWithUs: boolean = true;
  workWithUs: any;
  description = "";
  constructor(injector: Injector, private modalCtrl: ModalController) {
    super(injector);
    this.shared.companyWorkWithUsFetched.subscribe((res) => {
      this.workWithUs = res.data.work_with_us;
      if (this.workWithUs.length > 0) {
        this.hideWorkWithUs = false;
      } else {
        this.hideWorkWithUs = true;
      }
      this.setSelectedTab("Life", "LIFE");
    });
  }

  ngOnInit() {}

  setSelectedTab(tab, value) {
    this.selectedTab = tab;
    const workWithUs = this.workWithUs.find((x) => x.name == value);
    if (workWithUs) {
      this.description = workWithUs.description;
    }
  }

  async openEdit() {
    const modal = await this.modalCtrl.create({
      component: EditworkwithusPage,
      cssClass: 'modal-full-screen-view',
      enterAnimation: enterFromRightAnimation,
      leaveAnimation: leaveToRightAnimation,
      componentProps: {
        _workWithUs: this.workWithUs,
        isEdit: true
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
    });
    return await modal.present();
  }
}
