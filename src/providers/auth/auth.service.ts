import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BaseService } from '../base.service';
import { EmailValidator } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService extends BaseService{

  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}):Promise<any>{
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signWithEmail(user: {email:string, password: string}): Promise<firebase.auth.UserCredential>{
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((credential: firebase.auth.UserCredential)=>{
        return credential;
      }).catch(this.handlePromiseError);
  }

  logout():Promise<void>{
    return this.auth.auth.signOut();
  }

  get authenticated(): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      this.auth.authState.subscribe((user: firebase.User)=>{
        if(user){
          resolve(true)
        }else{
          reject(false);
        }
      })
    })
  }
}
