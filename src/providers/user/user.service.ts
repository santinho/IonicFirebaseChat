import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database'
import { User } from '../../models/user';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService extends BaseService{
  user: AngularFireObject<User>
  users: AngularFireList<any>

  constructor(public http: HttpClient,
    public af: AngularFireDatabase,
    public auth: AngularFireAuth
  ) {
    super();
    this.users = this.af.list('/user');
    this.listenAuthState();
  }


  private listenAuthState():void{
    this.auth.authState.subscribe((user:firebase.User)=>{
      if(user){
        this.user = this.af.object('/user/'+user.uid)
        console.log('Usuario Recuperado: ',this.user);
      }
    })
  }

  create(user: User, uuid: string): Promise<any>{
    return this.af.object('user/'+uuid).set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username:string): Observable<boolean>{
    return this.af.list('user', ref=>{
      return ref.orderByChild('username').equalTo(username)
    }).valueChanges().map((users:User[])=>{
      return users.length>0;
    })

  }

}
