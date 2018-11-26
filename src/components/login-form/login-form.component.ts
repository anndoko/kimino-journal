import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { Account } from '../../model/account.interface';
import { LoginResponse } from '../../model/login-response.interface';
import { AuthService } from '../../providers/auth/auth.service';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})

export class LoginFormComponent {

    account = {} as Account;
    @Output() loginStatus: EventEmitter<LoginResponse>;

    constructor(private auth: AuthService, private navCtrl: NavController) {
      this.loginStatus = new EventEmitter<LoginResponse>();
    }

    async login(){
      const loginResponse = await this.auth.signInWithEmailAndPassword(this.account)
      this.loginStatus.emit(loginResponse);
    }

  navigateToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

}
