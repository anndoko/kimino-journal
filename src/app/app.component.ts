import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:string ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push) {


    firebase.initializeApp({
      apiKey: "AIzaSyCJF0muzfJm3vj9SRliSco7rN2hE64d7tY",
      authDomain: "login-test-92df2.firebaseapp.com",
      databaseURL: "https://login-test-92df2.firebaseio.com",
      projectId: "login-test-92df2",
      storageBucket: "login-test-92df2.appspot.com",
      messagingSenderId: "644969656743"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = 'TabsPage';
        unsubscribe();
      }
    });


    platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.pushSetup();
    });


  }

    pushSetup(){
      const options: PushOptions = {
             android: {
               senderID: '644969656743'
             },
             ios: {
                 alert: 'true',
                 badge: true,
                 sound: 'false'
             }
          };

      const pushObject: PushObject = this.push.init(options);


        pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }



}
