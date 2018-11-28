import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryService } from "../../providers/entry/entry.service";

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private entryDataService: EntryService
    ) {
      let entryID = this.navParams.get("entryID");
      this.entry = this.entryDataService.getEntryByID(entryID);
      console.log("entry is ", this.entry);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
    console.log("entry is ", this.entry);
  }

}
