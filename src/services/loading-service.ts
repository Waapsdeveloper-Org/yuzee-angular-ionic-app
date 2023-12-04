import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  private spinner = { spinner: 'hide',content: `<img src="assets/imgs/loading.gif"/>`};
  constructor(public loadingController: LoadingController) {
  }
  
  showLoader() {
    this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: null
    }).then((res) => {
      res.present();
    });
  }

  hideLoader() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

}
