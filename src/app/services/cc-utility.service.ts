import { Injectable } from '@angular/core';

import { GenericBackConfirmationComponent } from '../shared';
import { GenericDeleteConfirmationComponent } from '../shared';
import { CcAlertsService } from './cc-alerts.service';
import { CcModalService } from './cc-modal.service';

@Injectable({
  providedIn: "root",
})
export class CcUtilityService {
  showdeletePopOver: any;
  constructor(public alerts: CcAlertsService, public modals: CcModalService) {}

  showAlert(msg, title = "Alert"): Promise<any> {
    return this.alerts.showAlert(msg, title);
  }

  presentToast(msg) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(
    okText = "OK",
    cancelText = "Cancel",
    title = "Are You Sure?",
    message = ""
  ): Promise<boolean> {
    return this.alerts.presentConfirm(okText,cancelText,title,message);
  }

  presentInput(
    okText = "OK",
    cancelText = "Cancel",
    title = "Are You Sure?",
    message = ""
  ): Promise<any> {
    return this.alerts.presentInput(okText, cancelText, title, message);
  }

  showConfirmPopOver() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise<any>(async (resolve) => {
      const dataReturned = await this.modals.present(
        GenericBackConfirmationComponent,
        {},
        "generic-alert-back-delete-modal generic-modal generic-model-backdrops"
      );
      if (dataReturned.data !== undefined) {
        if (dataReturned.data === "ok") {
          setTimeout(() => {
            resolve(true);
          }, 100);
        }
      }
    });
  }
  presentdeleteConfirm(
    okText = "Delete",
    cancelText = "Cancel",
    title = "Are You Sure?",
    message = ""
  ): Promise<boolean> {
    return this.alerts.presentRadioSelections(okText,cancelText,title,message);
  }

  showdeleteConfirmPopOver() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise<any>(async (resolve) => {
      const dataReturned = await this.modals.present(
        GenericDeleteConfirmationComponent,
        {},
        "generic-alert-back-delete-modal generic-modal generic-model-backdrops"
      );
      if (dataReturned.data !== undefined) {
        if (dataReturned.data === "ok") {
          setTimeout(() => {
            resolve(true);
          }, 100);
        }
      }
    });
  }
}
