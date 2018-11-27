import { Injectable } from '@angular/core';
import { Entry } from '../../model/entry'

@Injectable()
export class EntryService {

  private entries:Entry[] = [];

  constructor() {}

  public getEntries():Entry[] {
    let entriesClone = JSON.parse(JSON.stringify(this.entries));
    return entriesClone;
  }

  public addEntry(entry:Entry) {
    this.entries.push(entry);
    console.log("Added an entry, the list is now: ", this.entries);
  }
  
}