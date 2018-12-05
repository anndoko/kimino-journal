import { Injectable } from '@angular/core';
import { Entry, Setting } from '../../model/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { AlertController } from 'ionic-angular';


@Injectable()
export class EntryService {
  private db: any;
  private entries: Entry[] = [];
  private setting: Setting;
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;
  private userID: string;
  private userName: string;

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
        this.userName = user.email;

        let dataRef = this.db.ref('/' + this.userID + '/entry');

        dataRef.on('value', snapshot => {
          this.entries = [];
          snapshot.forEach(childSnapshot => {
            let entry = {
              id: childSnapshot.key,
              title: childSnapshot.val().title,
              text: childSnapshot.val().text,
              avatar: childSnapshot.val().avatar,
              img: childSnapshot.val().img,
              timestamp: childSnapshot.val().timestamp,
              location: childSnapshot.val().location
            };
            this.entries.push(entry);
            this.notifySubscribers();
          });
        });

        let settingRef = this.db.ref('/' + this.userID + '/setting');
        settingRef.on('value', snapshot => {
          if (snapshot.val() != null) {
            this.setting = {
              dailyNotification: snapshot.val().dailyNotification,
              regularNotification: snapshot.val().regularNotification
            };
          } else {
            this.setting = {
              dailyNotification: false,
              regularNotification: false
            };
          }
          this.notifySubscribers;
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

  public getUserName() {
    return this.userName;
  }

  public getEntries(): Entry[] {
    let entriesClone = JSON.parse(JSON.stringify(this.entries));
    console.log("getEntries!!!!!", entriesClone)

    return entriesClone;
  }

  public getSetting(): Setting[] {

    let settingClone = JSON.parse(JSON.stringify(this.setting));
    console.log("getSetting!!!!!", settingClone);

    return settingClone;
  }

  public addEntry(entry: Entry) {
    let diaryRef = this.db.ref('/' + this.userID + '/entry');
    let entryRef = diaryRef.push();
    let dataRecord = {
      title: entry.title,
      text: entry.text,
      avatar: entry.avatar,
      img: entry.img,
      timestamp: Date.now(),
      location: entry.location,
    }
    entryRef.set(dataRecord);
    console.log("Added an entry, the list is now: ", this.entries);
    this.notifySubscribers();
  }

  public removeEntry(id: string): void {
    let diaryRef = this.db.ref('/' + this.userID + '/entry');
    let entryRef = diaryRef.child(id);
    entryRef.remove();
    this.notifySubscribers();
  }

  public updateEntry(id: string, newEntry: Entry): void {
    let diaryRef = this.db.ref('/' + this.userID + '/entry');
    let entryRef = diaryRef.child(id);
    let newTimestamp = new Date(Date.now());

    entryRef.set({
      title: newEntry.title,
      text: newEntry.text,
      avatar: newEntry.avatar,
      img: newEntry.img,
      timestamp: Date.now(),
      location: newEntry.location
    });

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

  public toggleNotificationDaily(dailyChecked) {
    let diaryRef = this.db.ref('/' + this.userID + '/setting');
    let settingRef = diaryRef.child('dailyNotification')
    settingRef.set(dailyChecked);
    console.log("Notifiaction for daily reminder is now: ", dailyChecked);
    this.notifySubscribers();
  }

  public toggleNotificationRegular(regularChecked) {
    let diaryRef = this.db.ref('/' + this.userID + '/setting');
    let settingRef = diaryRef.child('regularNotification');
    settingRef.set(regularChecked);
    console.log("Notifiaction for regular reminder is now: ", regularChecked);
    this.notifySubscribers();
  }

}
