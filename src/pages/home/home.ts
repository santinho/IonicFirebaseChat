import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, Item } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user';
import { UserService } from '../../providers/user/user.service';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../providers/chat/chat.service.';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any
  view: string= 'chats'
  chats: any

  constructor(public navCtrl: NavController, public userService: UserService,
              public authService: AuthService, public chatService: ChatService
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
    this.chats = this.chatService.chats.valueChanges()
  }

  onChatCreate(recipientUser:User){

    this.userService.user.valueChanges().first()
    .subscribe((currentUser: User)=>{
        console.log(currentUser)
        this.chatService.getDeepChat(currentUser.username.replace('.',''), recipientUser.username.replace('.','')).valueChanges()
        .first().subscribe((chat:Chat)=>{
          if(!chat){
            let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

            let chat1 = new Chat('', timestamp, recipientUser.name, '')
            this.chatService.create(chat1, currentUser.username.replace('.',''), recipientUser.username.replace('.',''));

            let chat2 = new Chat('', timestamp, currentUser.name, '')
            this.chatService.create(chat2, recipientUser.username.replace('.',''), currentUser.username.replace('.',''));
          }

        })
      });

    this.navCtrl.push(ChatPage, {
      recipientUser:recipientUser
    })
  }

}
