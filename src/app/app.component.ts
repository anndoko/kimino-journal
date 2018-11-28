import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:string ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {


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
    });


  }


}
