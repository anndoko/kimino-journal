import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Entry } from '../../model/entry';
import { EntryService } from "../../providers/entry/entry.service";

@IonicPage()
@Component({
  selector: 'page-entry-edit',
  templateUrl: 'entry-edit.html',
})

export class EntryEditPage {

  private entry: Entry;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private entryDataService: EntryService
  ) {

    let entryID = this.navParams.get("entryID");
    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.title = "";
      this.entry.text = "";
      this.entry.avatar = "";
      this.entry.img = "";
      this.entry.timestamp = Date.now();
      this.entry.id = 'undefined'; // placeholder for 'temporary' entry
    } else {
      this.entry = this.entryDataService.getEntryByID(entryID);
    }
    console.log("entry is ", this.entry);
  }

  private saveEntry() {
    if (this.entry.id === 'undefined') {
      this.entryDataService.addEntry(this.entry);
    } else {
      this.entryDataService.updateEntry(this.entry.id, this.entry);
    }
    this.navCtrl.pop();
  }

  private cancelEntry() {
    this.navCtrl.pop();
  }

  private back() {
    this.navCtrl.pop();
  }

}
