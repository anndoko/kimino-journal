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

  private entryText: string;
  private entryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private entryDataService: EntryService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryEditPage');
  }

  private saveEntry() {
    let newEntry = new Entry();
    newEntry.title = this.entryTitle;
    newEntry.text = this.entryText;
    this.entryDataService.addEntry(newEntry);
    this.navCtrl.pop();
  }

  private cancelEntry() {
    this.navCtrl.pop();
  }

  private back() {
    this.navCtrl.pop();
  }

}
