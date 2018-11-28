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

  private editEntry(entryID: string) {
    console.log("editing entry ", entryID);
    this.navCtrl.push(EntryEditPage, { "entryID": entryID });
  }

  private deleteEntry(entryID: string) {
    console.log("deleting entry", entryID);
    this.entryDataService.removeEntry(entryID);
  }

}
