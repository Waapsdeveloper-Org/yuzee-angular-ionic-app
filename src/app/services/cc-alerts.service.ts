import { CcStringService } from "./cc-string.service";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class CcAlertsService {
  
  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public strings: CcStringService
  ) {}

  showAlert(msg, title = "Alert"): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: "my-custom-class",
        header: title,
        message: msg,
        buttons: [
          {
            text: "OK",
            cssClass: "secondary",
            handler: (blah) => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async presentSuccessToast(msg) {
    const toast = await this.toastCtrl.create({
      message: this.strings.capitalizeEachFirst(msg as string),
      duration: 5000,
      position: "top",
      cssClass: "successToast",
    });

    toast.present();
  }

  async presentFailureToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: this.strings.capitalizeEachFirst(msg ? msg : "ERROR"),
      duration: 5000,
      position: "top",
      cssClass: "failureToast",
    });

    toast.present();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: "bottom",
    });
    toast.present();
  }

  presentConfirm(
    okText = "OK",
    cancelText = "Cancel",
    title = "Are You Sure?",
    message = ""
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: [
          {
            text: cancelText,
            role: "cancel",
            handler: () => {
              resolve(false);
            },
          },
          {
            text: okText,
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
      alert.present();
    });
  }

  presentInput(
    okText = "OK",
    cancelText = "Cancel",
    title = "Are You Sure?",
    message = ""
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message,
        inputs: [
          {
            name: "qrcode",
            placeholder: "QRCODE",
          },
        ],
        buttons: [
          {
            text: cancelText,
            role: "cancel",
            handler: () => {
              resolve(false);
            },
          },
          {
            text: okText,
            handler: (data) => {
              if (!data.qrcode || data.qrcode == "") {
                resolve(null);
              } else {
                resolve(data.qrcode);
              }
            },
          },
        ],
      });
      alert.present();
    });
  }

  presentRadioSelections(
    title,
    message,
    inputs,
    okText = "OK",
    cancelText = "Cancel"
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message,
        inputs,
        buttons: [
          {
            text: cancelText,
            role: "cancel",
            handler: () => {
              resolve(false);
            },
          },
          {
            text: okText,
            handler: (data) => {
              resolve(data);
            },
          },
        ],
      });
      alert.present();
    });
  }
}
