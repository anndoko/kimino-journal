import { Injectable } from '@angular/core';
import { Entry } from '../../model/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { AlertController } from 'ionic-angular';


@Injectable()
export class EntryService {
  private db: any;
  private entries: Entry[] = [];
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;
  private userID: string;

  constructor(private alertCtrl: AlertController) {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }

    this.db = firebase.database();

    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });

    // Get entries according to userID
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
              avatar: childSnapshot.val().avatar,
              img: childSnapshot.val().img,
              timestamp: childSnapshot.val().timestamp
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
      avatar: entry.avatar,
      img: entry.img,
      timestamp: Date.now()
    }
    entryRef.set(dataRecord);
    console.log("Added an entry, the list is now: ", this.entries);
    this.notifySubscribers();
  }

  public removeEntry(id: string): void {
    let diaryRef = this.db.ref('/' + this.userID);
    let entryRef = diaryRef.child(id);
    entryRef.remove();
    this.notifySubscribers();
  }

  public updateEntry(id: string, newEntry: Entry): void {
    let diaryRef = this.db.ref('/' + this.userID);
    let entryRef = diaryRef.child(id);
    let newTimestamp = new Date(Date.now());
    let oldTimestamp = new Date(this.getEntryByID(id).timestamp);

    let alert = this.alertCtrl.create({
      title: 'Update timestamp?',
      message: 'Do you want to keep the original timestamp for this entry, or update to the current time?',
      inputs: [
        {
          name: "Keep Origin",
          type: "radio",
          value: 'Keep',
          label: 'Keep (' + oldTimestamp.toLocaleString() + ')',
          checked: true,
        },
        {
          name: "Update to now",
          type: "radio",
          value: 'Update',
          label: 'Update (' + newTimestamp.toLocaleString() + ')',
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log('Cancel');
          }
        },
        {
          text: "OK",
          handler: (data: string) => {
            if (data === 'Keep') {
              entryRef.set({
                title: newEntry.title,
                text: newEntry.text,
                avatar: newEntry.avatar,
                img: newEntry.img,
                timestamp: newEntry.timestamp,
              });
            } else {
              entryRef.set({
                title: newEntry.title,
                text: newEntry.text,
                avatar: newEntry.avatar,
                img: newEntry.img,
                timestamp: Date.now(),
              });
            }
          }
        },
      ]
    });
    alert.present();
    
    this.notifySubscribers();
  }

  public getEntryByID(id: string): Entry {
    for (let e of this.entries) {
      if (e.id === id) {
        let clone = JSON.parse(JSON.stringify(e));
        return clone;
      }
    }
    return undefined;
  }

}