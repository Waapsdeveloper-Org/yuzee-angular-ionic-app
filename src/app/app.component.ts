import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  INotificationPayload,
} from 'cordova-plugin-fcm-with-dependecy-updated';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  lang: string;
  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;
  isSettingsPrivacy: boolean = false;
  isHelpSupport: boolean = false;
  isEducationSupport: boolean = false;
  userInformation: any = {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private fcm: FCM,
    private router:Router
  ) {
    translate.setDefaultLang('en');
    this.initializeApp();
    this.setupFCM();

    if (localStorage.getItem("user_data_details")) {
      this.userInformation = JSON.parse(localStorage.getItem("user_data_details"));
      console.log(this.userInformation)
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    //this.router.navigate(['company-profile'])
      this.splashScreen.hide();
      if (this.platform.is('ios')) {
          this.statusBar.overlaysWebView(false);
          this.statusBar.backgroundColorByHexString("#387ef5");
      }
      else if (this.platform.is('android')) {
        this.statusBar.styleLightContent();
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString("#387ef5");
      }
      if(localStorage.getItem("Language")){
        this.lang = localStorage.getItem("Language")
        this.translate.use(this.lang);
      }
      else{
        localStorage.setItem("Language",'en')
      }
  
    });
  }

  private async setupFCM() {
    await this.platform.ready();
    console.log('FCM setup started');

    if (!this.platform.is('cordova')) {
      return;
    }
    console.log('In cordova platform');

    console.log('Subscribing to token updates');
    this.fcm.onTokenRefresh().subscribe((newToken) => {
      this.token = newToken;
      console.log('onTokenRefresh received event with: ', newToken);
    });

    console.log('Subscribing to new notifications');
    this.fcm.onNotification().subscribe((payload) => {
      console.log("Payload >>>>>",payload)
      if(payload.wasTapped){
        localStorage.setItem("Background-Set",JSON.stringify(payload))
        console.log("Received in background",payload);
        alert(JSON.stringify(payload))
      } else {
        alert(JSON.stringify(payload))
        console.log("Received in foreground",payload);
      };
      this.pushPayload = payload;
      console.log('onNotification received event with: ', payload);
    });

    this.hasPermission = await this.fcm.requestPushPermission();
    console.log('requestPushPermission result: ', this.hasPermission);

    await this.fcm.getToken().then((token)=>{
      this.token = token;
    },(error)=>{
      console.log(error)
    });
    console.log('getToken result: ', this.token);
    localStorage.setItem("TokenDevicId", this.token);

    this.pushPayload = await this.fcm.getInitialPushPayload();
    console.log('getInitialPushPayload result: ', this.pushPayload);
  }

  public get pushPayloadString() {
    return JSON.stringify(this.pushPayload, null, 4);
  }

  showSettingsPrivacy(){
    if(this.isSettingsPrivacy){
      this.isSettingsPrivacy = false;
    }else{
      this.isSettingsPrivacy = true;
    }
  }

  showHelpSupport(){
    if(this.isHelpSupport){
      this.isHelpSupport = false;
    }else{
      this.isHelpSupport = true;
    }
  }

  showEducationSupport(){
    if(this.isEducationSupport){
      this.isEducationSupport = false;
    }else{
      this.isEducationSupport = true;
    }
  }

}
