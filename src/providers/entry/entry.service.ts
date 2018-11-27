import { Injectable } from '@angular/core';
import { Entry } from '../../model/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';


@Injectable()
export class EntryService {
  private db: any;
  private entries: Entry[] = [];
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;
  private userID: string;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }

    this.db = firebase.database();

    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });

    // get entries according to userID
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userID = user.uid;

        let dataRef = this.db.ref('/' + this.userID);

        dataRef.on('value', snapshot => {
          this.entries = [];
          snapshot.forEach(childSnapshot => {
            let entry = {
              id: childSnapshot.key,
              title: childSnapshot.val().title,
              text: childSnapshot.val().text,
              // img: childSnapshot.val().img,
              timestamp: childSnapshot.val().timestamp,
            };
            this.entries.push(entry);
            this.notifySubscribers();
          });
        });
      }
    });
  }

  public getObservable(): Observable<Entry[]> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

  public getEntries(): Entry[] {
    let entriesClone = JSON.parse(JSON.stringify(this.entries));
    console.log("getEntries!!!!!", entriesClone)

    return entriesClone;
  }

  public addEntry(entry: Entry) {
    let diaryRef = this.db.ref('/' + this.userID);
    let entryRef = diaryRef.push();
    let dataRecord = {
      title: entry.title,
      text: entry.text,
      timestamp: Date.now(),
    }
    entryRef.set(dataRecord);
    console.log("Added an entry, the list is now: ", this.entries);

    // this.notifySubscribers();
  }

}