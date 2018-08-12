import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import { SignupPage } from '../pages/signup/signup';
import { SignupPageModule } from '../pages/signup/signup.module';
import { UserService } from '../providers/user/user.service';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBT-uBl1_lmldwJuhmx_eJomrBRVGPlSqQ",
  authDomain: "fir-chat-f546d.firebaseapp.com",
  databaseURL: "https://fir-chat-f546d.firebaseio.com",
  projectId: "fir-chat-f546d",
  storageBucket: "fir-chat-f546d.appspot.com",
  messagingSenderId: "146414475502"

}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    SignupPageModule,
    HttpClientModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
  ]
})
export class AppModule {}
