import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  enter(){
      this.navCtrl.push('LoginPage');
  }


  create(){
    this.navCtrl.push('RegisterPage');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
