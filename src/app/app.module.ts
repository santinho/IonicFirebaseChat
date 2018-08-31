
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { AngularFireAuth } from 'angularfire2/auth';
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
import { AuthService } from '../providers/auth/auth.service';
import { SigninPageModule } from '../pages/signin/signin.module';
import { PipesModule } from '../pipes/pipes.module';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service.';

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
    HomePage,
    CustomLoggedHeaderComponent,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    SignupPageModule,
    SigninPageModule,
    HttpClientModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    CustomLoggedHeaderComponent,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    AngularFireAuth,
    ChatService
  ]
})
export class AppModule {}
