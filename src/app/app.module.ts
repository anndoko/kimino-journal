import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { AuthService } from '../providers/auth/auth.service';
import { EntryService } from '../providers/entry/entry.service';

import { MyApp } from './app.component';
import { EntryDetailPage } from '../pages/entry-detail/entry-detail';
import { EntryEditPage } from '../pages/entry-edit/entry-edit'
import { SettingPage } from '../pages/setting/setting';
import { SettingPageModule } from '../pages/setting/setting.module';
import { EntryEditPageModule } from '../pages/entry-edit/entry-edit.module';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    EntryDetailPage,
    // EntryEditPage,
    // SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    SettingPageModule,
    EntryEditPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntryDetailPage,
    EntryEditPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    EntryService,
    Geolocation,
    LocalNotifications
  ]
})
export class AppModule { }
