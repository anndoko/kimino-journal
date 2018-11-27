import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryEditPage } from '../entry-edit/entry-edit';
import { Entry } from '../../model/entry';
import { EntryService } from "../../providers/entry/entry.service";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {
  private entries: Entry[] = [];
  private account = {} as Account;

  constructor(
    public navCtrl: NavController,
    private entryDataService: EntryService
  ) {
    this.entryDataService.getObservable().subscribe(update => {
      this.entries = entryDataService.getEntries();
    });
    this.entries = this.entryDataService.getEntries();
  }

  private addEntry() {
    this.navCtrl.push(EntryEditPage);
  }
}
