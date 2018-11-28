import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../model/login-response.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController) {
  }

  register(event: LoginResponse) {
    if (!event.error) {
      this.toast.create({
        message: 'Account created',
        duration: 3000
      }).present();
    }
    else {
      this.toast.create({
        message: 'Account not created',
        duration: 3000
      }).present();
    }

  }
}
