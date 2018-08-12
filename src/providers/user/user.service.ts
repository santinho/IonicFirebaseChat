import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { User } from '../../models/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {

  users: AngularFireList<any>

  constructor(public http: HttpClient,
    public af: AngularFireDatabase,
  ) {
    this.users = this.af.list('/users');
  }

  create(user: User): firebase.database.ThenableReference{
    return this.users.push(user);
  }

}
