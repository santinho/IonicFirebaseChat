import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Chat } from '../../models/chat.model';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider extends BaseService{

  constructor(public http: HttpClient, public af: AngularFireDatabase) {
    super();
  }

  create(chat:Chat, userId1: string, userId2: string): Promise<void>{
    return this.af.object('/chats/'+userId1+'/'+userId2).set(chat).catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat>{
    return this.af.object('/chats/'+userId1+'/'+userId2);
  }

}
