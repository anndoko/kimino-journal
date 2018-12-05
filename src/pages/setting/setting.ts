import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Setting } from '../../model/entry';
import { EntryService } from '../../providers/entry/entry.service';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  private setting: any;
  private username: string;

  message: string = "";
  time: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private entryDataService: EntryService,
    public localNotifications: LocalNotifications,
    private toast: ToastController
  ) {
    this.entryDataService.getObservable().subscribe(update => {
      this.setting = entryDataService.getSetting();
      this.username = entryDataService.getUserName();
    });
    this.setting = this.entryDataService.getSetting();
    this.username = entryDataService.getUserName();

  }


  scheduleNotification() {
    if (this.setting.dailyNotification) {
      this.localNotifications.schedule({
        id: 1,
        text: this.message,
        data: 'My hidden message this is',
        trigger: { at: new Date(new Date().getTime() + parseInt(this.time) * 1000) }
      });
    } else {
      this.toast.create({
        message: "You haven't activate your notification yet! Please turn it on to receive it!",
        duration: 1500
      }).present();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  private toggleSettingDaily(checked) {
    this.entryDataService.toggleNotificationDaily(checked);
  }

  private toggleSettingRegular(checked) {
    this.entryDataService.toggleNotificationRegular(checked);
  }

}
