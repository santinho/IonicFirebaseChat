import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages: string[] = []
  pageTitle: string;
  sender: User
  recipient: User

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(newMessage:string):void{
    this.messages.push(newMessage);
  }

  ionViewDidLoad(){
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.user.valueChanges().first().subscribe((currentUser:User)=>{
      this.sender = currentUser;
    })
  }

}
