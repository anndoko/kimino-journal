import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntryEditPage } from '../entry-edit/entry-edit';
import { Entry } from '../../model/entry';
import { EntryService } from "../../providers/entry/entry.service";

@IonicPage()
@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {
  private entries: Entry[] = [];

  constructor(
    public navCtrl: NavController, 
    private entryDataService: EntryService
    ) {}

  public ionViewWillEnter() {
    this.entries = this.entryDataService.getEntries();
  }

  private addEntry() {
    this.navCtrl.push(EntryEditPage);
  }
}
