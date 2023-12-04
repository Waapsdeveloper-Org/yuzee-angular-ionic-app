import { Injectable } from "@angular/core";
import { ModalController, ModalOptions } from "@ionic/angular";
import { enterFromRightAnimation } from "../shared/page-transitions/page-enter-transition";
import { leaveToRightAnimation } from "../shared/page-transitions/page-leave-transition";

@Injectable({
  providedIn: "root",
})
export class CcModalService { 
  constructor(public modal: ModalController) {}

  present(component, data = {}, cssClass = "", animate = null, modeType: any = "ios" ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise( async (resolve) => {

      let obj: ModalOptions = {
        component,
        cssClass,
        componentProps: data,
        mode: modeType,
        showBackdrop: true,
        swipeToClose: true,
      }

      if(animate == 'right'){
        obj.enterAnimation = enterFromRightAnimation;
        obj.leaveAnimation = leaveToRightAnimation;
      }

      const modal = await this.modal.create(obj);
      modal.onDidDismiss().then((res) => {
        resolve(res);
      });
      await modal.present();
    });
  }

  dismiss(data: any = {}): Promise<any> {
    return new Promise((resolve) => {
      data.dismiss = true;
      this.modal.dismiss(data).then((v) => resolve(true));
    });
  }
}
