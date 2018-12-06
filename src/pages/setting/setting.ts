import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Setting } from '../../model/entry';
import { EntryService } from '../../providers/entry/entry.service';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  private setting: any;
  private username: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private entryDataService: EntryService
  ) {
    this.entryDataService.getObservable().subscribe(update => {
      this.setting = entryDataService.getSetting();
      this.username = entryDataService.getUserName();
    });
    this.setting = this.entryDataService.getSetting();
    this.username = entryDataService.getUserName();

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
