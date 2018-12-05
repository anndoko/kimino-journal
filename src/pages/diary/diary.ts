import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryEditPage } from '../entry-edit/entry-edit';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { Entry } from '../../model/entry';
import { EntryService } from "../../providers/entry/entry.service";
import firebase from 'firebase';
import { SettingPage } from '../setting/setting';
import { Platform, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})

export class DiaryPage {
  private entries: Entry[] = [];

  constructor(
    public navCtrl: NavController,
    private entryDataService: EntryService,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController
  ) {
    this.entryDataService.getObservable().subscribe(update => {
      this.entries = entryDataService.getEntries();
    });
    this.entries = this.entryDataService.getEntries();
  }

  private addEntry() {
    this.navCtrl.push(EntryEditPage);
  }

  private editEntry(entryID: string) {
    console.log("editing entry ", entryID);
    this.navCtrl.push(EntryEditPage, { "entryID": entryID });
  }

  private deleteEntry(entryID: string) {
    console.log("deleting entry", entryID);
    this.entryDataService.removeEntry(entryID);
  }

  private viewEntry(entryID: string) {
    this.navCtrl.push(EntryDetailPage, { "entryID": entryID });
  }

  private goToSetting() {
    this.navCtrl.push(SettingPage);
  }

}
