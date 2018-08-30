import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, Item } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any
  view: string= 'chats'

  constructor(public navCtrl: NavController, public userService: UserService,
              public authService: AuthService
  ) {

  }

  ionViewCanEnter():Promise<boolean>{
   return this.authService.authenticated;
  }

  onSignup():void{
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad(){
    this.users = this.userService.users.valueChanges();
  }

  onChatCreate(user:User){
    this.navCtrl.push(ChatPage, {
      recipientUser:user
    })
  }

}
