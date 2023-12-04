import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import {
  Injectable,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { YuzeeCommonModule } from 'yuzee-shared-lib';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import {
  IonicModule,
  IonicRouteStrategy,
} from '@ionic/angular';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './library/guards/authguard';
import { SettingsComponent } from './menu/settings/settings.component';
import { NgxPubSubService } from './services/store/services/ngx-pub-sub.service';
import { PrivacyPopupComponent } from './shared/privacy-popup/privacy-popup.component';
import { AppSharedModule } from './shared/shared.module';

Injectable()
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PrivacyPopupComponent
  ],
  entryComponents: [SettingsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    YuzeeCommonModule,
    AppSharedModule,
    BarRatingModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    Camera,
    MediaCapture,
    Media,
    FilePath,
    FileTransfer,
    File,
    NativeGeocoder,
    YoutubeVideoPlayer,
    Geolocation,
    AuthGuard,
    FCM,
    Base64,
    LaunchNavigator,
    PreviewAnyFile,
    PhotoViewer,
    NgxIonicImageViewerModule,
    Keyboard,
    HttpClientModule,
    HttpClientJsonpModule,
    PhotoLibrary,
    Clipboard,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgxPubSubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
