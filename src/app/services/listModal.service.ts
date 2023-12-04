import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  GenericSearchableRadioSelectionComponent,
  GenericMultiSearchableRadioSelectionComponent,
  UsersComponent,
} from "src/app/shared";

@Injectable({
  providedIn: "root",
})
export class ListModalService {

  constructor(
    public modal: ModalController,
  ) {}

  present(title, data, keyToShow, cssClass = "", type = "", showSearch = true, hideResetBtn = false,
  placeholder = 'Search', selected = null, disableIndexes = []): Promise<any> {

    if (type === "fullscreen") {
      cssClass = "";

    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const modal = await this.modal.create({
        component: GenericSearchableRadioSelectionComponent,
        cssClass,
        componentProps:  {title, data, keyToShow, showSearch, modalType: type, hideResetBtn, placeholder, selected, disableIndexes}
      });
      modal.onDidDismiss().then((res) => {
        resolve(res);
      });
      await modal.present();
    });
  }

  multiPresent(title, data, keyToShow, cssClass = "", type = "", showSearch = true, placeholder = 'Search', selected = []): Promise<any> {

    if (type === "fullscreen") {
      cssClass = "";

    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const modal = await this.modal.create({
        component: GenericMultiSearchableRadioSelectionComponent,
        cssClass,
        componentProps: {title, data, keyToShow, showSearch, modalType: type, placeholder, selected, },
      });
      modal.onDidDismiss().then((res) => {
        resolve(res);
      });
      await modal.present();
    });
  }

  multiPresentUsers(
    title,
    data,
    keyToShow,
    showSearch = true,
    selected = null
  ): Promise<any> {
    let cssClass = "modal-full-screen-view";
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve) => {
      const modal = await this.modal.create({
        component: UsersComponent,
        cssClass,
        componentProps: { title, data, keyToShow, showSearch, selected },
      });
      modal.onDidDismiss().then((res) => {
        resolve(res);
      });
      await modal.present();
    });
  }

  async fullScreen(title, data, keyToShow, cssClass: string, placeholder = "Search", selected: any = null) {
    return await this.present(title, data, keyToShow, cssClass ,"fullscreen", true, true, placeholder, selected);
  }

  async withoutSearch(title, data, keyToShow, cssClass: string, hideResetBtn = false, placeholder = "Search", selected: any = null ){
    return await this.present(title, data, keyToShow, cssClass ,"withoutSearch", false, hideResetBtn, placeholder, selected);
  }

  async multiFullScreen(title, data, keyToShow, cssClass: string, placeholder = "Search", selected: any = null ) {
    return await this.multiPresent(title, data, keyToShow, cssClass ,"fullscreen", true, placeholder, selected);
  }
  async multiWithoutSearch(title, data, keyToShow, cssClass: string, selected = null) {
    return await this.multiPresent(
      title,
      data,
      keyToShow,
      cssClass,
      "withoutSearch",
      false,
      'Search',
      selected
    );
  }
  // Users
  async multiFullScreenAllUsers(title, data, keyToShow, showSearch = false, selected = null) {
    return await this.multiPresentUsers(title, data, keyToShow, showSearch, selected);
  }

  dismiss(data: any = {}): Promise<any> {
    return new Promise((resolve) => {
      data.dismiss = true;
      this.modal.dismiss(data).then((v) => resolve(true));
    });
  }


}
