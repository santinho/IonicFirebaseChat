import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Chat } from '../../models/chat.model';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'
import { User } from '../../models/user';
import { UserService } from '../user/user.service';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatService extends BaseService{

  chats: AngularFireList<Chat>

  constructor(public http: HttpClient, public af: AngularFireDatabase, public auth: AngularFireAuth, public userService: UserService) {
    super();
    this.setChats();
  }

  private setChats():void{
    this.auth.authState.subscribe((user:firebase.User)=>{
      if(user){
        //this.af.list(`/users/${user.uid}`).valueChanges().first().subscribe((user: User)=>{
          this.chats = this.af.list(`/chats/a`, ref=>{return ref.orderByChild('timestamp')})
        //});

      }

    })
  }

  create(chat:Chat, username1: string, username2: string): Promise<void>{
    return this.af.object('/chats/'+username1+'/'+username2).set(chat).catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat>{
    return this.af.object('/chats/'+userId1+'/'+userId2);
  }

}
