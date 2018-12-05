import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Entry } from '../../model/entry';
import { EntryService } from "../../providers/entry/entry.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DiaryPage } from '../diary/diary';
import { Geolocation } from '@ionic-native/geolocation';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";

@IonicPage()
@Component({
  selector: 'page-entry-edit',
  templateUrl: 'entry-edit.html',
})

export class EntryEditPage {

  private entry: Entry;
  private oldImg: any;
  private image = PLACEHOLDER_IMAGE;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private entryDataService: EntryService,
    private camera: Camera,
    private geolocation: Geolocation,
    private toast: ToastController,
  ) {
    let entryID = this.navParams.get("entryID");
    if (entryID === undefined) {
      this.entry = new Entry();
      this.entry.title = "";
      this.entry.text = "";
      this.entry.avatar = "../../assets/imgs/avatar1.png";
      this.entry.img = PLACEHOLDER_IMAGE;
      this.entry.timestamp = Date.now();
      this.entry.location = [0, 0];
      this.entry.id = 'undefined'; // placeholder for 'temporary' entry
    } else {
      this.entry = this.entryDataService.getEntryByID(entryID);
      this.oldImg = this.entry.img;
    }
    console.log("entry is ", this.entry);
  }

  // Take photo using native camer
  private takePic() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.entry.img = 'data:image/jpeg;base64,' + imageData;
      } else {
        this.entry.img = PLACEHOLDER_IMAGE;
      }
    }, (err) => {
      if (this.oldImg != null) {
        this.entry.img = this.oldImg;

      } else {
        this.entry.img = PLACEHOLDER_IMAGE;
      }
    });

    this.entry.img = SPINNER_IMAGE;
  }

  // Select photo from local library
  private getPic() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.entry.img = 'data:image/jpeg;base64,' + imageData;
      } else {
        this.entry.img = PLACEHOLDER_IMAGE;
      }
    }, (err) => {
      if (this.oldImg != null) {
        this.entry.img = this.oldImg;

      } else {
        this.entry.img = PLACEHOLDER_IMAGE;
      }
    });

    this.entry.img = SPINNER_IMAGE;
  }

  // Check in the geolocation
  private getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.toast.create({
        message: 'Get location successfully!',
        duration: 1500
      }).present();

      console.log('get location: ');
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.entry.location = [resp.coords.latitude, resp.coords.longitude];

    }).catch((error) => {
      this.toast.create({
        message: 'Error getting location' + error,
        duration: 3000
      }).present();
    });

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   console.log('from watch: ');
    //   console.log(data.coords.latitude);
    //   console.log(data.coords.longitude);
    // });
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
